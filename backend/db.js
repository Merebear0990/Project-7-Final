const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the databasse')
})

const createTables = () => {
    const userTable =
    `CREATE TABLE IF NOT EXISTS users (
        userId uuid DEFAULT gen_random_uuid(),
        firstName VARCHAR NOT NULL,
        lastName VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        PRIMARY KEY (userId),
        UNIQUE (email)
    )`
  pool.query(userTable)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  })
}