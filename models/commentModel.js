const { sequelize, DataTypes } = require('../db/db');

const Comment = sequelize.define('Comment',
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    }
  }
)

Comment.sync({force: true});

module.exports = Comment;