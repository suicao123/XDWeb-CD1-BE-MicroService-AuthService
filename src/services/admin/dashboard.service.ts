import { prisma } from 'config/client';

const getDashboardPageInfo = async () => {
  const countUser = await prisma.user.count();
  const countProduct = await prisma.product.count();
  const countOrder = await prisma.order.count();
  return {
    countOrder,
    countUser,
    countProduct,
  };
};
export { getDashboardPageInfo };
