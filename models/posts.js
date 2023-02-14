'use strict';

module.exports = (sequelize, DataTypes) => {
    
    const post = sequelize.define('post', {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id:{
        type: DataTypes.UUID,
        allowNull:false,
        unique: true,
    },
    });

    return post;
  };