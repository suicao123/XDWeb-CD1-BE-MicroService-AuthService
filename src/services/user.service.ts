import getConectTion from '../config/database';

const handleCreateUser = async (
  name: string,
  email: string,
  address: string,
) => {
  //insert into dataBase
  const connection = await getConectTion();
  try {
    const sql =
      'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?, ?)';
    const values = [name, email, address];
    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }

  console.log('>>> insert a new user');
};
const getAllUsers = async () => {
  const connection = await getConectTion();
  try {
    const [results, fields] = await connection.query('SELECT * FROM `users` ');
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export { handleCreateUser, getAllUsers };
