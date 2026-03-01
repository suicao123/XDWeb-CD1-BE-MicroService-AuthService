import { prisma } from 'config/client';

const handelGetAllOrder = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  });
  return orders;
};
const handelGetOrderDetailsWithId = async (id: number) => {
  const orderDetail = await prisma.ordeDetail.findMany({
    where: {
      orderId: id,
    },
    include: {
      product: true,
    },
  });
  return orderDetail;
};
export { handelGetAllOrder, handelGetOrderDetailsWithId };
