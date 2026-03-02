import { Request, Response } from 'express';
import { getDashboardPageInfo } from 'services/admin/dashboard.service';
import {
  countTotalOrderPages,
  handelGetAllOrder,
} from 'services/admin/order.service';
import {
  countTotalProductPages,
  handelGetAllProduct,
} from 'services/admin/product.service';
import {
  countTotalUserPages,
  getAllRoles,
  getAllUsers,
} from 'services/admin/user.service';

const getDashboardPage = async (req: Request, res: Response) => {
  const info = await getDashboardPageInfo();
  return res.render('admin/dashboard/show.ejs', {
    info,
  });
};
const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let curentPage = page ? +page : 1;
  if (curentPage <= 0) curentPage = 1;
  const users = await getAllUsers(curentPage);

  const roles = await getAllRoles();

  const totalPage = await countTotalUserPages();
  return res.render('admin/user/show.ejs', {
    users: users,
    roles,
    totalPage,
    curentPage,
  });
};
const getAdminOrderPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let curentPage = page ? +page : 1;
  if (curentPage <= 0) curentPage = 1;
  const totalPage = await countTotalOrderPages();
  const orders = await handelGetAllOrder(curentPage);

  return res.render('admin/order/show.ejs', {
    orders,
    totalPage,
    curentPage,
  });
};
const getAdminProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let curentPage = page ? +page : 1;
  if (curentPage <= 0) curentPage = 1;
  const totalPage = await countTotalProductPages();

  const products = await handelGetAllProduct(curentPage);
  return res.render('admin/product/show.ejs', {
    products,
    totalPage,
    curentPage,
  });
};
export {
  getDashboardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
