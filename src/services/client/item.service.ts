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
const handelDeleteCart = async (id: number) => {
  const cardDetail = await prisma.cartDetail.delete({
    where: {
      id: id,
    },
  });
  const quantity = cardDetail.quantity;
  const card = await prisma.cart.findUnique({
    where: {
      id: cardDetail.cartId,
    },
  });
  const count = +card.sum - +cardDetail.quantity;
  if (count === 0) {
    await prisma.cart.delete({
      where: {
        id: card.id,
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        id: card.id,
      },
      data: {
        sum: {
          decrement: quantity,
        },
      },
    });
  }
};
const updateCartDetailBeforeCheckout = async (
  data: { id: string; quantity: string }[],
  cartId: string,
) => {
  let quantity = 0;
  for (let i = 0; i < data.length; i++) {
    quantity += +data[i].quantity;
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id,
      },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }
  await prisma.cart.update({
    where: {
      id: +cartId,
    },
    data: {
      sum: quantity,
    },
  });
};
const handelPlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number,
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId,
        },
        include: {
          cartDetails: true,
        },
      });
      if (cart) {
        //create order
        const dataOrderDetail =
          cart?.cartDetails?.map((item) => ({
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          })) ?? [];
        await tx.order.create({
          data: {
            receiverName,
            receiverAddress,
            receiverPhone,
            paymentMethod: 'COD',
            paymentStatus: 'PAYMENT_UNPAID',
            staus: 'PEDING',
            totalPrice: totalPrice,
            userId,
            orderDetails: {
              create: dataOrderDetail,
            },
          },
        });

        //remove cart detail +cart
        await tx.cartDetail.deleteMany({
          where: {
            cartId: cart.id,
          },
        });
        await tx.cart.delete({
          where: {
            id: cart.id,
          },
        });

        //check product
        for (let i = 0; i < cart.cartDetails.length; i++) {
          const productId = cart.cartDetails[i].productId;
          const product = await tx.product.findUnique({
            where: { id: productId },
          });
          if (!product || product.quantity < cart.cartDetails[i].quantity) {
            throw new Error(
              `Sản phẩm ${product?.name} không tồn tại hoặc không đủ số lượng`,
            );
          }
          await tx.product.update({
            where: {
              id: productId,
            },
            data: {
              quantity: {
                decrement: cart.cartDetails[i].quantity,
              },
              sold: {
                increment: cart.cartDetails[i].quantity,
              },
            },
          });
        }
      }
    });
    return '';
  } catch (error) {
    console.log(error);
    return error.message;
  }
  //Tạo transaction
};
const handelTakeHistoryUser = async (userId: number) => {
  const history = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
    },
  });
  return history;
};
export {
  getProduct,
  addProductToCart,
  getcartDetailWithId,
  handelDeleteCart,
  updateCartDetailBeforeCheckout,
  handelPlaceOrder,
  handelTakeHistoryUser,
};
