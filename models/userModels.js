const { sequelize, DataTypes } = require('../db/db');

const User = sequelize.define('User', {
  urlAvatar: {
  type: DataTypes.TEXT,
  allowNull: true
  },
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
  birthdate: {
   type: DataTypes.STRING,
   allowNull: true
  },
  phone: {
   type: DataTypes.STRING,
   allowNull: true
  },
  bio: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
