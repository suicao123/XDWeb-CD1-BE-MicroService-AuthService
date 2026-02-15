import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
) => {
  const newUser = await prisma.user.create({
    data: {
      fullName: name,
      username: email,
      address: address,
      password: '123456',
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
    },
  });
  return newUser;
};
const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};
const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
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
      fullName: name,
      username: email,
      address: addres,
      password: '',
      accountType: '',
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
  getAllRoles,
};
