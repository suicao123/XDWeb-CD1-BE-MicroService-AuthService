import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';
import { comparePassword, hashPassWord } from 'services/admin/user.service';

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
const handelLogin = async (
  username: string,
  password: string,
  callback: any,
) => {
  //check user exist in db
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    // throw new Error(`Username:${username} not found`);
    return callback(null, false, {
      message: `Username:${username} not found`,
    });
  }

  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    // throw new Error('Invalid password');
    return callback(null, false, {
      message: `Invalid password`,
    });
  }
  return callback(null, user);
};
export { isEmailExist, registerNewUser, handelLogin };
