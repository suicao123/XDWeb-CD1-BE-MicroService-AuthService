import { Request, Response } from 'express';
import { getAllRoles, getAllUsers } from 'services/user.service';

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render('admin/dashboard/show.ejs');
};
const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  const roles = await getAllRoles();
  return res.render('admin/user/show.ejs', {
    users: users,
    roles,
  });
};
const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render('admin/order/show.ejs');
};
const getAdminProductPage = async (req: Request, res: Response) => {
  return res.render('admin/product/show.ejs');
};
export {
  getDashboardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
