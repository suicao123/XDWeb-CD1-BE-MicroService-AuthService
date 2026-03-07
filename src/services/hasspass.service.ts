import bcrypt from 'bcrypt';

const saltRounds = 10;
const hashPassWord = async (plainText: string) => {
  return await bcrypt.hash(plainText, saltRounds);
};
const comparePassword = async (plainText: string, hashPassWord: string) => {
  return await bcrypt.compare(plainText, hashPassWord);
};
export { hashPassWord, comparePassword };
