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
const getProductWithFiilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
  price: string,
  sort: string,
) => {
  //build where query
  let whereClause: any = {};
  if (factory) {
    const factoryInput = factory.split(',');
    whereClause.factory = {
      in: factoryInput,
    };
  }

  if (target) {
    const targetInput = target.split(',');
    whereClause.target = {
      in: targetInput,
    };
  }

  if (price) {
    const priceInput = price.split(',');
    const priceCondition = [];
    for (let i = 0; i < priceInput.length; i++) {
      if (priceInput[i] === 'duoi-10-trieu') {
        priceCondition.push({ price: { lt: 10000000 } });
      }
      if (priceInput[i] === '10-15-trieu') {
        priceCondition.push({ price: { gte: 10000000, lte: 15000000 } });
      }
      if (priceInput[i] === '15-20-trieu') {
        priceCondition.push({ price: { gte: 15000000, lt: 20000000 } });
      }
      if (priceInput[i] === 'tren-20-trieu') {
        priceCondition.push({ price: { gt: 20000000 } });
      }
    }
    whereClause.OR = priceCondition;
  }
  let orderByClause: any = {};
  if (sort) {
    if (sort === 'gia-tang-dan') {
      orderByClause = {
        price: 'asc',
      };
    }
    if (sort === 'gia-giam-dan') {
      orderByClause = {
        price: 'desc',
      };
    }
  }
  const skip = (page - 1) * pageSize;
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      skip,
      take: pageSize,
      where: whereClause,
      orderBy: orderByClause,
    }),
    prisma.product.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(count / pageSize);
  return {
    products,
    totalPages,
  };
};
export {
  userFilter,
  productMinPrice,
  productMaxPrice,
  productRange10To15,
  productRange10To15And16To20,
  productSort,
  prodcutFilterWithFactory,
  getProductWithFiilter,
};
