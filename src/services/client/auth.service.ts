import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';
import { hashPassWord } from 'services/admin/user.service';

const isEmailExist = async (email: string) => {
  const emailExit = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });
  if (emailExit) {
    return true;
  }
  return false;
};
const registerNewUser = async (
  fullname: string,
  username: string,
  password: string,
) => {
  const hashPass = await hashPassWord(password);
  const userRole = await prisma.role.findUnique({
    where: {
      name: 'USER',
    },
  });
  if (userRole) {
    const newUser = await prisma.user.create({
      data: {
        fullName: fullname,
        username,
        password: hashPass,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  }
};
export { isEmailExist, registerNewUser };
