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
    dog_type: {
      type: DataTypes.ENUM,
      values: ['비숑','닥스훈트','믹스견','말티즈','포메라니안','푸들','스피치'],
      allowNull: false,
    },
    dog_sex: {
      type: DataTypes.ENUM,
      values:["남아","여아"],
      allowNull: false,
    }, 
    // 받아올때 년도만 받아오세요.
    dog_birthyear: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }, 
});

  return DogInfos;
}