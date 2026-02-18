import {
  ProductSchema,
  TProductSchema,
} from './../../validation/product.schema';
import { Request, Response } from 'express';

const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render('admin/product/create');
};
const postCreateProductPage = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;
  try {
    const result = ProductSchema.parse(req.body);
    console.log('Run oke: ', result);
  } catch (error) {
    console.log(error);
  }
  //   const file = req.file;
  //   const avatar = file?.filename ?? undefined;

  return res.redirect('/admin/product');
};
export { getCreateProductPage, postCreateProductPage };
