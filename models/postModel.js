const { sequelize, DataTypes } = require('../db/db');

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
   type: DataTypes.TEXT,
   allowNull: false
  },
  sinopse: {
   type: DataTypes.STRING(500),
   allowNull: false
  },
});

module.exports = Post;
