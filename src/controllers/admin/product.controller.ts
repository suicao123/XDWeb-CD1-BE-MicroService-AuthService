import {
  handelCreateProduct,
  handelGetAllProduct,
} from 'services/product.service';
import {
  ProductSchema,
  TProductSchema,
} from './../../validation/product.schema';
import { Request, Response } from 'express';


const getCreateProductPage = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: '',
    price: '',
    detailDesc: '',
    shortDesc: '',
    quantity: '',
    factory: '',
    target: '',
  };
  return res.render('admin/product/create', {
    errors,
    oldData,
  });
};
const postCreateProductPage = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;
  const validate = ProductSchema.safeParse(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`,
    );
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };
    return res.render('admin/product/create', {
      errors,
      oldData,
    });
  }
  const file = req.file;
  const avatar = file?.filename ?? undefined;
  const newProduct = await handelCreateProduct(
    name,
    price,
    avatar,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
  );
  return res.redirect('/admin/product');
};
export { getCreateProductPage, postCreateProductPage };
