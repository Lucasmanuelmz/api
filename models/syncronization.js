const { associateModels } = require('./associate');
associateModels();
const { sequelize } = require('../db/db');

sequelize.sync()
.then(() => {
  res.status(200).json({ms: 'Db sincronizado com sucesso!'})
})
.catch(error => {
  res.status(400).json({ms: 'A sincronizacao de Db falhou. ',details: error.message})
})

module.exports = sequelize;

