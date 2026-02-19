import { isEmailExist } from 'services/client/auth.service';
import * as z from 'zod';

const emailSchema = z
  .string()
  .email('Email không đúng định dạng')
  .refine(
    async (email) => {
      const existingUser = await isEmailExist(email);
      return !existingUser;
    },
    {
      message: 'Email already exists',
      path: ['email'],
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
    username: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password confirm không chính xác',
    path: ['connfirmPassWord'],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
