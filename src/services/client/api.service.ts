import { prisma } from 'config/client';
import { comparePassword } from 'services/admin/user.service';
import jwt from 'jsonwebtoken';
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
    id: 1,
    name: 'MnhQUan',
  };
  const access_token = jwt.sign(payload, 'quan', { expiresIn: '1d' });
  return access_token;
};
export {
  handelGetAllUser,
  handelGetUserById,
  handelUpdateUserById,
  handelUserLogin,
};
