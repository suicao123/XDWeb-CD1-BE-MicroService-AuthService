import { Request, Response } from 'express';

const getLoginPage = (req: Request, res: Response) => {
  return res.render('client/login/show');
};
export { getLoginPage };
