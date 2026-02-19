import { Request, Response } from 'express';

const getRegisterPage = (req: Request, res: Response) => {
  return res.render('client/register/show');
};
export { getRegisterPage };
