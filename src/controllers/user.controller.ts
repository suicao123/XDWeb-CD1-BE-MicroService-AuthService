import { Request, Response } from 'express';

import {
  getAllRoles,
  getAllUsers,
  handelDeleteUser,
  handelGetUserById,
  handelUpdateUser,
  handleCreateUser,
} from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await getAllUsers();
  return res.render('home', {
    users: users,
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
  const avatar = file?.filename ?? 'Không upload file';
  // handele create user
  const user = await handleCreateUser(
    fullname,
    username,
    address,
    phone,
    avatar,
  );

  return res.redirect('/admin/user');
};
const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await handelDeleteUser(id as string);

  return res.redirect('/');
};
const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  //get user by id
  const user = await handelGetUserById(id as string);
  return res.render('view-user', {
    id: id,
    user: user,
  });
};
const postUpdateUser = async (req: Request, res: Response) => {
  const { id, name, email, address } = req.body;

  const result = await handelUpdateUser(id, name, email, address);

  return res.redirect('/');
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
