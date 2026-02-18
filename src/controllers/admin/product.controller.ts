import {
  handelCreateProduct,
  handelDeleteProduct,
  handelGetAllProduct,
  handelGetProductById,
  handelUpdateProduct,
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
const getViewProdcut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handelGetProductById(id as string);
  return res.render('admin/product/detail', {
    product,
  });
};
const postUpdateProduct = async (req: Request, res: Response) => {
  const { id, name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;
  const file = req.file;
  const avatar = file?.filename ?? undefined;
  const pr = await handelUpdateProduct(
    id,
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
const postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handelDeleteProduct(id as string);
  return res.redirect('/admin/product/');
};
export {
  getCreateProductPage,
  postCreateProductPage,
  getViewProdcut,
  postUpdateProduct,
  postDeleteProduct,
};
