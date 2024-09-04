const { sequelize, DataTypes } = require('../db/db');
const Category = require('./categoryModel');
const User = require('./userModels');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
   type: DataTypes.STRING(500),
   allowNull: false
  },
  sinopse: {
   type: DataTypes.STRING(500),
   allowNull: false
  },
});

Post.belongsTo(Category);
Category.hasMany(Post);

Post.belongsTo(User);
User.hasMany(Post);

Post.sync({alter: true})
module.exports = Post;
