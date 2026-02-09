import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from '../services/user.service';

const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await getAllUsers();
  console.log('Check users:', users);

  return res.render('home', {
    name: users,
  });
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
