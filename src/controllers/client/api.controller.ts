import { Request, Response } from 'express';
import {
  handelRegisterOTP,
  handelSendOTP,
  handelUserLogin,
} from 'services/client/api.service';
import {
  RegisterSchema,
  TRegisterSchema,
} from '../../validation/register.schema';
const loginAPI = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const { access, refresh, user } = await handelUserLogin(username, password);
    res.status(200).json({
      data: {
        access,
        refresh,
        username: user,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const { message } = await handelSendOTP(email);
    res.status(200).json({
      message,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const registerAPI = async (req: Request, res: Response) => {
  const { fullname, username, otp, email, password, confirm_password } =
    req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`,
    );
    res.status(400).json({
      errors: errors,
    });
    return;
  }

  //success
  try {
    await handelRegisterOTP(fullname, email, otp, username, password);
    res.status(201).json({
      data: {
        message: 'Đăng ký thành công',
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({
      message: error.message || 'Mã OTP sai hoặc Username đã tồn tại',
    });
  }
};

export { loginAPI, sendOTP, registerAPI };
