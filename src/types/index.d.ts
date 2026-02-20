import { Prisma } from '@prisma/client';
import { User, Role } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends User {
      role?: Role;
    }
  }
}
