const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const dbConnectionString = process.env.CONNECTION;
const sequelize = new Sequelize(dbConnectionString);

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