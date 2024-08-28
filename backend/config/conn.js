//databse connection 
const { Sequelize } = require('sequelize');

// Create a Sequelize 
const conn = new Sequelize({
  dialect: 'mysql', 
  host: process.env.DB_HOST,
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test database connection
const authenticateDB = async () => {
  try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');
    console.log(process.env.PORT)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

authenticateDB();

module.exports = conn;
