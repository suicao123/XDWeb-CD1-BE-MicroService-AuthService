import { prisma } from 'config/client';

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
export { handelGetAllUser, handelGetUserById, handelUpdateUserById };
