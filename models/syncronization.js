const { associateModels } = require('./associate');
associateModels();
const { sequelize } = require('../db/db')

sequelize.sync({alter: true})
.then(() => {
  console.log('Os Modelos foram alterados com sucesso!')
})
.catch((error) => {
  console.log('Nao foi possivel sincronizar os models ', {details: error.message})
})

module.exports = sequelize;

