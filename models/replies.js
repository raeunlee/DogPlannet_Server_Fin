const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    
    const reply = sequelize.define('reply', {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: True,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: False,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: False,
      }
    });

    reply.associate = function(models){
        reply.belongsTo(models.posts, {
            onDelete:'cascade',
            foreignKey: {
                allowNull: False,
              },
        })
      };

    return reply;
  };