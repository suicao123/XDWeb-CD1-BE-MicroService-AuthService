import { prisma } from 'config/client';
import { hashPassWord } from 'services/hasspass.service';

const initDatabase = async () => {
  const countUser = await prisma.user.count();

  if (countUser === 0) {
    const defaultPassword = await hashPassWord('123456');

    await prisma.user.createMany({
      data: [
        {
          fullName: 'Nguyen Manh Quan',
          username: 'mnhquan0109@gmail.com',
          password: defaultPassword,
          email: 'mnhquan0109@gmail.com',
        },
        {
          fullName: 'admin',
          username: 'admin',
          password: defaultPassword,
          email: 'admin@gmail.com',
        },
      ],
    });
  }
  if (countUser !== 0) {
    console.log('>>> ALREADY INIT DATA...');
  }
};

export default initDatabase;
