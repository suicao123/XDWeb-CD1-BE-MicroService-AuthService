import { Request, Response } from 'express';
import {
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

const getUserPage = (req: Request, res: Response) => {
  return res.render('create-user');
};
const postCreateUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  //
  const user = await handleCreateUser(name, email, address);

  return res.redirect('/');
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
  getUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
