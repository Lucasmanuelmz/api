const { sequelize, DataTypes } = require('../db/db');
const Post = require('./postModel');
const User = require('./userModels');

const Comment = sequelize.define('Comment',
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }
)
Comment.belongsTo(Post)
Post.hasMany(Comment)

Comment.belongsTo(User)
User.hasMany(Comment)
Comment.sync({alter: true});

module.exports = Comment;