const { sequelize, DataTypes } = require('../db/db');

const Comment = sequelize.define('Comment',
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }
)

module.exports = Comment;