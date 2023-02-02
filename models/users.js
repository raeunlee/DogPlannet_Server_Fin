const { DataTypes } = require("sequelize");
'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Users = sequelize.define('Users', {
    user_id:{
        type: DataTypes.UUID,
        allowNull:false,
        unique: true,
        primaryKey: true
    },
    //이메일고정형식che
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isEmail: true,
        }
    },
    user_password: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    myprofile: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  });

  return Users;
};