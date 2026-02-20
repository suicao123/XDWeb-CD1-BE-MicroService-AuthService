import { Request, Response } from 'express';

const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const mesages = session?.messages ?? [];
  return res.render('client/login/show', {
    mesages,
  });
};
const getSuccessRedirectPage = (req: Request, res: Response) => {
  const user = req.user as any;
  if (user?.role.name === 'ADMIN') {
    res.redirect('/admin');
  } else {
    res.redirect('/');
  }
};
export { getLoginPage, getSuccessRedirectPage };
