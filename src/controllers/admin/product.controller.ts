import { Request, Response } from 'express';

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render('admin/product/create');
};
const postCreateProductPage = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body;
  const file = req.file;
  const avatar = file?.filename ?? undefined;

  return res.redirect('/admin/product');
};
export { getCreateProductPage, postCreateProductPage };
