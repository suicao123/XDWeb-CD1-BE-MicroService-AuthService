import { prisma } from 'config/client';
import { comparePassword, hashPassWord } from 'services/hasspass.service';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import otpGenerate from 'otp-generator';
import { Resend } from 'resend';
import sendMail from 'config/email';

const resend = new Resend(process.env.RESEND_API_KEY);

const handelUserLogin = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error(`Tên đăng nhập hoặc mật khẩu không đúng`);
  }

  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
  }

  const payload = {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
  };

  const secret = process.env.JWT_SECRET;
  const expriesIn: any = process.env.JWT_EXPRIRES_IN;
  // Access Token
  const access_token = jwt.sign(payload, secret, {
    expiresIn: expriesIn,
  });

  //Refesh Token
  const refreshToken = crypto.randomBytes(64).toString('hex');
  const refreshExpiresAt = new Date();
  refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7); // 7 ngày

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: refreshExpiresAt,
    },
  });
  return {
    access: access_token,
    refresh: refreshToken,
    user: user.username,
  };
};
const handelSendOTP = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email không hợp lệ ');
  }
  const checkEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (checkEmail) {
    throw new Error('Email đã tồn tại');
  }
  const otpCode = otpGenerate.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const expiresAt = new Date();
  const expiresMinutesOTP = parseInt(process.env.OTP_EXPIRES_MINUTES);
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresMinutesOTP);
  await prisma.otp.create({
    data: {
      email,
      code: otpCode,
      expiresAt,
    },
  });

  //send Email
  try {
    await sendMail(email, otpCode, expiresMinutesOTP);
    console.log(`OTP đã được được gửi cho ${email}:${otpCode}`);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return {
    message: 'OTP sent successfully',
  };
};
const handelVerifyOTP = async (email: string, code: string) => {
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      isUsed: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (!otp) {
    throw new Error('Mã OTP sai hoặc Username đã tồn tại');
  }
  await prisma.otp.update({
    where: {
      id: otp.id,
    },
    data: {
      isUsed: true,
    },
  });
  return true;
};
const handelRegisterOTP = async (
  fullName: string,
  email: string,
  otp: string,
  username: string,
  password: string,
) => {
  const isValidOTP = await handelVerifyOTP(email, otp);
  if (!isValidOTP) {
    throw new Error('OTP không hợp lệ');
  }
  const hashpassWord = await hashPassWord(password);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashpassWord,
      fullName,
    },
  });
  await prisma.otp.deleteMany({
    where: {
      email,
    },
  });
  return newUser;
};

export { handelUserLogin, handelSendOTP, handelVerifyOTP, handelRegisterOTP };
