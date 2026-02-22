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
export { getProduct, addProductToCart };
