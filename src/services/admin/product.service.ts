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
const handelGetProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
  return product;
};
const handelUpdateProduct = async (
  id: string,
  name: string,
  price: number,
  image: string,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
) => {
  const updateProduct = await prisma.product.update({
    where: {
      id: +id,
    },
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
  return updateProduct;
};
const handelDeleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id: +id,
    },
  });
  return product;
};
export {
  handelCreateProduct,
  handelGetAllProduct,
  handelGetProductById,
  handelUpdateProduct,
  handelDeleteProduct,
};
