import { prisma } from 'config/client';

const getProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};
const addProductToCart = async (
  quantity: number,
  productId: number,
  user: Express.User,
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (cart) {
    //update
    //cập nhật sum giở hàng
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });

    //cập nhật cart-detail
    //nếu chưa có, tạo mới. có rồi, cập nhật quantity

    const currentCarDetail = await prisma.cartDetail.findFirst({
      where: {
        productId,
        cartId: cart.id,
      },
    });
    await prisma.cartDetail.upsert({
      where: {
        id: currentCarDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product.price,
        quantity,
        productId,
        cartId: cart.id,
      },
    });
  } else {
    //create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity,
              productId,
            },
          ],
        },
      },
    });
  }
};
const getcartDetailWithId = async (id: number) => {
  const products = await prisma.cartDetail.findMany({
    where: {
      cartId: id,
    },
    include: {
      product: true,
    },
  });
  return products;
};
export { getProduct, addProductToCart, getcartDetailWithId };
