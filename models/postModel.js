const { sequelize, DataTypes } = require('../db/db');
const Category = require('./categoryModel');
const User = require('./userModels');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    allowNull: false  // Agora é obrigatório
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: true
  },
  commentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Comments',
      key: 'id'
    },
    allowNull: true
  }
});

module.exports = Post;
