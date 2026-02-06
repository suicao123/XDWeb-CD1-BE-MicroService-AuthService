import { Request, Response } from 'express';
import { handleCreateUser } from '../services/user.service';

const getHomePage = (req: Request, res: Response) => {
  return res.render('home');
};

const getUserPage = (req: Request, res: Response) => {
  return res.render('create-user');
};
const postCreateUser = (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  handleCreateUser(name, email, address);
  return res.redirect('/');
};

export { getHomePage, getUserPage, postCreateUser };
