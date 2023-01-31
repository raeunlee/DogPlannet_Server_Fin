const { DataTypes } = require("sequelize");
'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const DogRecords = sequelize.define('DogRecords', {
    user_id:{
      type: DataTypes.UUID,
      allowNull:false,
      unique: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
       // allowNull: true,
    },
    /*
    //array형식
    poop_type:{
        type: sequelize.ARRAY(sequelize.TEXT),
        defaultValue: ["정상","변비","설사"],
        allowNull: true,
    },*/
    sleep_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
    walk_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    walk_distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    //이게 이미지입니다.
    mydog: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
});

DogRecords.associate = function(models) {
  DogRecords.belongsTo(models.Users,{
        onDelete:'cascade',
        foreignKey: {
            allowNull:false,
        }
    });
  };

  return DogRecords;
};