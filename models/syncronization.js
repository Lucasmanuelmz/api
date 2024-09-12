const { associateModels } = require('./associate');
associateModels();
const { sequelize } = require('../db/db');

sequelize.sync()
.then(() => {
  console.log('Db sincronizado com sucesso!')
})
.catch(error => {
  console.log('A sincronizacao de Db falhou.')
})

module.exports = sequelize;

