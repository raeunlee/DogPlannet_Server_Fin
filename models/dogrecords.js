'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogRecords = sequelize.define('DogRecords', {
    user_id:{
      type: DataTypes.UUID,
      allowNull:false,
      unique: True,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: False,
    },
    weight: {
        type: DataTypes.Float,
        allowNull: True,
    },
    //array형식
    poop_type:{
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: ["정상","변비","설사"],
        allowNull: True,
    },
    sleep_time: {
        type: DataTypes.Integer,
        allowNull: True,
    }, 
    walk_time: {
      type: DataTypes.Integer,
      allowNull: True,
    },
    walk_distance: {
      type: DataTypes.Integer,
      allowNull: True,
    },
    //이게 이미지입니다.
    mydog: {
      type: DataTypes.BLOB('long'),
      allowNull: False,
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