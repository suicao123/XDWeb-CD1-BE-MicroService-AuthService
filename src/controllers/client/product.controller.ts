import { Request, Response } from 'express';

const getProductPage = (req: Request, res: Response) => {
  res.render('client/product/details');
};
export { getProductPage };
