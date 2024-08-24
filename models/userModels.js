const { sequelize, DataTypes } = require('../db/db');
const Category = require('./categoryModel')

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany(Category);
Category.belongsTo(User);

module.exports = User;
