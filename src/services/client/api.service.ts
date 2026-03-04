import { prisma } from 'config/client';

const handelGetAllUser = async () => {
  return await prisma.user.findMany();
};
export { handelGetAllUser };
