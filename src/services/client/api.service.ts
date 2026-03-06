import { prisma } from 'config/client';
import { comparePassword } from 'services/admin/user.service';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const handelGetAllUser = async () => {
  return await prisma.user.findMany();
};
const handelGetUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
const handelUpdateUserById = async (
  id: number,
  fullName: string,
  address: string,
  phone: string,
) => {
  return await prisma.user.update({
    where: { id },
    data: { fullName, address, phone },
  });
};
const handelUserLogin = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error(`Username:${username} not found`);
  }

  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const payload = {
    id: user.id,
    username: user.username,
    roleId: user.roleId,
    accountType: user.accountType,
    avatar: user.avatar,
  };
  const secret = process.env.JWT_SECRET;
  const expriesIn: any = process.env.JWT_EXPRIRES_IN;

  const access_token = jwt.sign(payload, secret, {
    expiresIn: expriesIn,
  });
  return access_token;
};
export {
  handelGetAllUser,
  handelGetUserById,
  handelUpdateUserById,
  handelUserLogin,
};
