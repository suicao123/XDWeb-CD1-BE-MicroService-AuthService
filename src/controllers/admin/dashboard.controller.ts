import { Request, Response } from 'express';
import { getDashboardPageInfo } from 'services/admin/dashboard.service';
import { handelGetAllOrder } from 'services/admin/order.service';
import { handelGetAllProduct } from 'services/admin/product.service';
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
  console.log('>>> check page:', page);
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
  const orders = await handelGetAllOrder();

  return res.render('admin/order/show.ejs', {
    orders,
  });
};
const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await handelGetAllProduct();
  return res.render('admin/product/show.ejs', {
    products,
  });
};
export {
  getDashboardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
