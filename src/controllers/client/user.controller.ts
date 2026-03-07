import { prisma } from 'config/client';

const checkEmail = async (email: string) => {
  const emailOutput = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailOutput) return true;
  return false;
};
const checkUserName = async (username: string) => {
  const userNameOutput = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (userNameOutput) return true;
  return false;
};
export { checkEmail, checkUserName };
