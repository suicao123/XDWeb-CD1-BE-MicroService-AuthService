import { prisma } from 'config/client';
import getConectTion from 'config/database';

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
) => {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  return newUser;
};
const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};
const handelDeleteUser = async (id: string) => {
  try {
    const connection = await getConectTion();
    const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const handelGetUserById = async (id: string) => {
  try {
    const connection = await getConectTion();
    const sql = 'SELECT * FROM `users` WHERE `id`= ?';
    const values = [id];
    const [result, fields] = await connection.execute(sql, values);
    return result[0];
  } catch (error) {
    console.log(error);
    return [];
  }
};
const handelUpdateUser = async (
  id: string,
  name: string,
  email: string,
  addres: string,
) => {
  try {
    const connection = await getConectTion();
    const sql =
      'UPDATE `users` SET `name` = ? , `email` = ? , `address` = ? WHERE `id` = ? LIMIT 1';
    const values = [name, email, addres, id];

    const [result, fields] = await connection.execute(sql, values);

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export {
  handleCreateUser,
  getAllUsers,
  handelDeleteUser,
  handelGetUserById,
  handelUpdateUser,
};
