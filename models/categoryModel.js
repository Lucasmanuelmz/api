const { sequelize, DataTypes } = require('../db/db');
const Post = require('./postModel');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
  tableName: 'Categories'
});

module.exports = Category;
