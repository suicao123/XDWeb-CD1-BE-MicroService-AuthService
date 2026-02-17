import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const hashPassWord = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};
const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
  role: string,
) => {
  const hashPass = await hashPassWord('123456');
  const newUser = await prisma.user.create({
    data: {
      fullName: name,
      username: email,
      address: address,
      password: hashPass,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role,
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
  fullname: string,
  username: string,
  addres: string,
  phone: string,
  role: string,
  avatar: string,
) => {
  const hashPass = await hashPassWord('123456');
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      fullName: fullname,
      username: username,
      address: addres,
      password: hashPass,
      accountType: ACCOUNT_TYPE.SYSTEM,
      phone: phone,
      roleId: +role,
      ...(avatar !== undefined && { avatar: avatar }),
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
  hashPassWord,
};
