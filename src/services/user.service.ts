import getConectTion from 'config/database';

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
) => {
  //insert into dataBase

  try {
    const connection = await getConectTion();
    const sql =
      'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?, ?)';
    const values = [name, email, address];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getAllUsers = async () => {
  try {
    const connection = await getConectTion();
    const [results, fields] = await connection.query('SELECT * FROM `users` ');
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
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
export { handleCreateUser, getAllUsers, handelDeleteUser, handelGetUserById };
