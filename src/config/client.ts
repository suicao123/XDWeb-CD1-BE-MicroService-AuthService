import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
console.log('--- Kiểm tra kết nối DB ---');
console.log(
  'DATABASE_URL đang dùng:',
  process.env.DATABASE_URL ? 'Đã tìm thấy' : 'Trống/Undefined',
);
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
