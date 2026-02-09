import { prisma } from 'config/client';
import getConectTion from 'config/database';

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
) => {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  return newUser;
};
const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};
const handelDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
  return deleteUser;
};
const handelGetUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};
const handelUpdateUser = async (
  id: string,
  name: string,
  email: string,
  addres: string,
) => {
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      name: name,
      email: email,
      address: addres,
    },
  });
  return updateUser;
};
export {
  handleCreateUser,
  getAllUsers,
  handelDeleteUser,
  handelGetUserById,
  handelUpdateUser,
};
