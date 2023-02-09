'use strict';
module.exports = (sequelize, DataTypes) => {
 
  const DogInfos = sequelize.define('DogInfos', {
    user_id:{
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    dog_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dogtype: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    dog_sex:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }, 
    // 받아올때 년도만 받아오세요.
    dog_birthyear: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }, 
});

  return DogInfos;
}