import { prisma } from 'config/client';

const userFilter = async (username: string) => {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
  });
};
const productMinPrice = async (priceMin: number) => {
  return await prisma.product.findMany({
    where: {
      price: {
        gte: priceMin,
      },
    },
  });
};
const productMaxPrice = async (priceMax: number) => {
  return await prisma.product.findMany({
    where: {
      price: {
        lte: priceMax,
      },
    },
  });
};
const prodcutFilterWithFactory = async (nameFactory: string) => {
  return await prisma.product.findMany({
    where: {
      factory: {
        equals: nameFactory,
      },
    },
  });
};
const productRange10To15 = async (price: string) => {
  const ranger = price.split('-');
  const min = ranger[0];
  const max = ranger[ranger.length - 1];
  return await prisma.product.findMany({
    where: {
      price: {
        lte: +max,
        gte: +min,
      },
    },
  });
};
const productRange10To15And16To20 = async (priceRange: string[]) => {
  const min = [];
  const max = [];
  priceRange.forEach((range) => {
    min.push(range[0]);
    max.push(range[range.length - 1]);
  });
  return await prisma.product.findMany({
    where: {
      AND: [
        {
          price: {
            lte: +max[0],
            gte: +min[0],
          },
        },
        {
          price: {
            lte: +max[1],
            gte: +min[1],
          },
        },
      ],
    },
  });
};
const productSort = async () => {
  return await prisma.product.findMany({
    orderBy: {
      price: 'asc',
    },
  });
};
export {
  userFilter,
  productMinPrice,
  productMaxPrice,
  productRange10To15,
  productRange10To15And16To20,
  productSort,
  prodcutFilterWithFactory,
};
