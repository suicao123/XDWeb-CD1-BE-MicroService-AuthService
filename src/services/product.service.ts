import { prisma } from 'config/client';
const handelCreateProduct = async (
  name: string,
  price: number,
  image: string,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
) => {
  const newProdcut = await prisma.product.create({
    data: {
      name,
      price: +price,
      detailDesc,
      shortDesc,
      quantity: +quantity,
      factory,
      target,
      ...(image && { image: image }),
    },
  });
  return newProdcut;
};
const handelGetAllProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};
export { handelCreateProduct, handelGetAllProduct };
