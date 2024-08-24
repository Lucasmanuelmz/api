const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_KEY = process.env.DB_KEY;

const sequelize = new Sequelize(
DB_NAME, DB_USER, DB_KEY, {

host: 'localhost',
timezone: '+02:00',
dialect: 'postgres',
logging: false
});

async function connectDB() {
try{

 await sequelize.authenticate();
 console.log('Conectado ao banco de dados');

} catch(error) {
  console.log('Erro ', error.message)
  throw Error('Erro ao se connectar com o banco ');

}};
connectDB();

module.exports = {sequelize, DataTypes};