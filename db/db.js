const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const dbConnectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(dbConnectionString, {
  dialect: 'postgres',
  timezone: '+02:00',
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