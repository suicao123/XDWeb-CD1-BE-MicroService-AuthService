import { Request, Response } from 'express';
import { registerNewUser } from 'services/client/auth.service';
import {
  RegisterSchema,
  TRegisterSchema,
} from 'src/validation/register.schema';

const getRegisterPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  return res.render('client/register/show', {
    errors,
    oldData,
  });
};
const postRegister = async (req: Request, res: Response) => {
  const { fullname, username, password, confirmPassword } =
    req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`,
    );
    const oldData = {
      fullname,
      username,
      password,
      confirmPassword,
    };
    return res.render('client/register/show', {
      errors,
      oldData,
    });
  }

  await registerNewUser(fullname, username, password);
  return res.redirect('/login');
};

export { getRegisterPage, postRegister };
