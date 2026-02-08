import mysql from 'mysql2/promise';

// Create the connection to database
const getConectTion = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'nodejspro',
  });
  try {
    const [results, fields] = await connection.query('SELECT * FROM `users` ');

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
};

export default getConectTion;
