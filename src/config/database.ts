import mysql from 'mysql2/promise';

// Create the connection to database
const getConectTion = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'nodejspro',
  });
  return connection;
};

export default getConectTion;
