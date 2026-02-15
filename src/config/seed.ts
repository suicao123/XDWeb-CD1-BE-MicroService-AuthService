import { prisma } from 'config/client';

const innitDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: 'mnhquan0109@gmail.com',
          password: '1234',
          accountType: 'SYSTEM',
        },
        {
          username: 'admin@gmail.com',
          password: '1234',
          accountType: 'SYSTEM',
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
