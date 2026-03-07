import { prisma } from 'config/client';
import { comparePassword, hashPassWord } from 'services/hasspass.service';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import otpGenerate from 'otp-generator';
import transporter from 'config/email';
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
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Mã OTP xác thực tài khoản',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">
          ${otpCode}
        </div>
        <p style="color: #666; margin-top: 20px;">
          Mã OTP này sẽ hết hạn sau <strong>${expiresMinutesOTP} phút</strong>.
        </p>
        <p style="color: #999; font-size: 12px;">
          Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP đã được được gửi cho ${email}:${otpCode}`);
  } catch (error) {
    console.error(error);
    throw new Error('Không thể gửi email. Vui lòng thử lại sau.');
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
