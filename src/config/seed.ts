import { prisma } from 'config/client';
import { hashPassWord } from 'services/user.service';
import { ACCOUNT_TYPE } from 'config/constant';

const innitDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: 'MnhQuan',
          username: 'mnhquan0109@gmail.com',
          password: await hashPassWord('1234'),
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
        {
          fullName: 'Admin',
          username: 'admin@gmail.com',
          password: await hashPassWord('1234'),
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
      ],
    });
  } else if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: 'ADMIN',
          description: 'Admin thì full quyền ',
        },
        {
          name: 'USER',
          description: 'User thông thường',
        },
      ],
    });
  } else {
    console.log('>>>> ALREDY INIT DATA ...');
  }
};
export default innitDatabase;
