import { Request, Response } from 'express';

const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const mesages = session?.messages ?? [];
  return res.render('client/login/show', {
    mesages,
  });
};
export { getLoginPage };
