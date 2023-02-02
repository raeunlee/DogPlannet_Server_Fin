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
    /*
    //array형식
    dog_type: {
      type: sequelize.ARRAY(sequelize.TEXT),
      defaultValue: ["비숑","닥스훈트","믹스견","말티즈","포메라니안","푸들","스피치"],
      allowNull: true,
    },
    //array형식
    dog_sex:{
      type: sequelize.ARRAY(sequelize.TEXT),
      defaultValue: ["암컷","수컷"],
      allowNull: True,
    },*/
    // 받아올때 년도만 받아오세요.
    dog_birthyear: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }, 
});

  return DogInfos;
}