'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id:{
        type: DataTypes.UUID,
        allowNull:False,
        unique: True,
    },
    //이메일고정형식
    user_email: {
        type: DataTypes.String,
        allowNull: false,
        validate:{
          isEmail: true,
        }
    },
    user_password: {
        type:DataTypes.STRING,
        allowNull:False,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: False,
    },
    myprofile: {
      type: DataTypes.BLOB('long'),
      allowNull: False,
    },
  });

  Users.associate = function(models) {
    models.Users.hasMany(models.DogInfos, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      });
  };

  Users.associate = function(models) {
    models.Users.hasMany(models.DogRecords, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      });
  };

  Users.associate = function(models) {
    models.Users.hasMany(models.posts, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      });
  };

  return Users;
};