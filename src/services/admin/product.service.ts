import { prisma } from 'config/client';
import {
  TOTAL_ITEMS_PER_PAGE,
  TOTAL_ITEMS_PRODUCT_PAGE,
} from 'config/constant';
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
const handelGetAllProduct = async (page: number) => {
  const pageSize = TOTAL_ITEMS_PRODUCT_PAGE;
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
  });
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
const countTotalProductPages = async () => {
  const pageSize = TOTAL_ITEMS_PRODUCT_PAGE;

  const countUsers = await prisma.product.count();
  const totalPages = Math.ceil(countUsers / pageSize);
  return totalPages;
};
const countTotalProductClientPages = async (page: number) => {
  const countUsers = await prisma.product.count();
  const totalPages = Math.ceil(countUsers / page);
  return totalPages;
};
export {
  handelCreateProduct,
  handelGetAllProduct,
  handelGetProductById,
  handelUpdateProduct,
  handelDeleteProduct,
  countTotalProductPages,
  countTotalProductClientPages,
};
