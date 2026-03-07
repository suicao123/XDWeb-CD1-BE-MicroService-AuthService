import { checkEmail, checkUserName } from 'controllers/client/user.controller';
import * as z from 'zod';

const emailSchema = z
  .string()
  .email('Email không đúng định dạng')
  .refine(
    async (email) => {
      const existingUser = await checkEmail(email);
      return !existingUser;
    },
    {
      message: 'Email đã tồn tại',
      path: ['email'],
    },
  );
const usernameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Username không được để trống' })
  .refine(
    async (username) => {
      const existingUserName = await checkUserName(username);
      return !existingUserName;
    },
    {
      message: 'Username đã tồn tại',
      path: ['username'],
    },
  );
const passwordSchema = z
  .string()
  .min(8, { message: 'Độ dài tối thiểu 8 kí tự' });
//   .max(20, { message: maxLengthErrorMessage });
//   .refine((password) => /[A-Z]/.test(password), {
//     message: uppercaseErrorMessage,
//   })
//   .refine((password) => /[a-z]/.test(password), {
//     message: lowercaseErrorMessage,
//   })
//   .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
//   .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: specialCharacterErrorMessage,
//   });
export const RegisterSchema = z
  .object({
    fullname: z.string().trim().min(1, {
      message: 'Tên không được để trống',
    }),
    username: usernameSchema,
    email: emailSchema,
    otp: z.string().trim().min(1, {
      message: 'OTP Không được để trống',
    }),
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password confirm không chính xác',
    path: ['connfirmPassWord'],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
