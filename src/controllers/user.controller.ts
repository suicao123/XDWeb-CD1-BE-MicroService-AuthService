import { Request, Response } from 'express';
import {
  countTotalProductClientPages,
  countTotalProductPages,
} from 'services/admin/product.service';

import {
  getAllRoles,
  getAllUsers,
  handelDeleteUser,
  handelGetUserById,
  handelUpdateUser,
  handleCreateUser,
} from 'services/admin/user.service';
import { getProduct } from 'services/client/item.service';

const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let curentPage = page ? +page : 1;
  if (curentPage <= 0) curentPage = 1;
  const totalPages = await countTotalProductClientPages(8);

  const products = await getProduct(curentPage, 8);
  return res.render('client/home/show', {
    products,
    page: curentPage,
    totalPages,
  });
};
const getProductFilterPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let curentPage = page ? +page : 1;
  if (curentPage <= 0) curentPage = 1;
  const totalPages = await countTotalProductClientPages(6);
  const products = await getProduct(curentPage, 8);
  return res.render('client/product/filter', {
    products,
    page: curentPage,
    totalPages,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render('admin/user/create', {
    roles,
  });
};
const postCreateUser = async (req: Request, res: Response) => {
  const { fullname, username, phone, address, role } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? undefined;
  // handele create user
  const user = await handleCreateUser(
    fullname,
    username,
    address,
    phone,
    avatar,
    role,
  );

  return res.redirect('/admin/user');
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handelDeleteUser(id as string);

  return res.redirect('/admin/user');
};
const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roles = await getAllRoles();
  //get user by id
  const user = await handelGetUserById(id as string);
  return res.render('admin/user/view', {
    id: id,
    user: user,
    roles,
  });
};
const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullname, username, address, phone, role } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? undefined;
  await handelUpdateUser(id, fullname, username, address, phone, role, avatar);

  return res.redirect('/admin/user');
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getProductFilterPage,
};
