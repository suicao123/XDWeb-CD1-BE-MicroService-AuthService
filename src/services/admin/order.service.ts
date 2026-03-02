import { prisma } from 'config/client';
import { TOTAL_ITEMS_ORDER_PAGE } from 'config/constant';

const handelGetAllOrder = async (page: number) => {
  const pageSize = TOTAL_ITEMS_ORDER_PAGE;
  const skip = (page - 1) * pageSize;
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    skip,
    take: pageSize,
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
const countTotalOrderPages = async () => {
  const pageSize = TOTAL_ITEMS_ORDER_PAGE;

  const countUsers = await prisma.order.count();
  const totalPages = Math.ceil(countUsers / pageSize);
  return totalPages;
};
export { handelGetAllOrder, handelGetOrderDetailsWithId, countTotalOrderPages };
