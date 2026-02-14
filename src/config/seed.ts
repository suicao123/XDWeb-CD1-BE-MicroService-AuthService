import { prisma } from 'config/client';

const innitDatabase = async () => {
  const countUser = await prisma.user.count();
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
  } else {
    console.log('>>>> ALREDY INIT DATA ...');
  }
};
export default innitDatabase;
