import getConectTion from '../config/database';

const handleCreateUser = (name: string, email: string, address: string) => {
  //insert into dataBase

  //return result

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
