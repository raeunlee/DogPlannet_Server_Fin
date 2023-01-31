module.exports = (sequelize, DataTypes) => {
    const reply = sequelize.define('reply', {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: True,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });

    reply.associate = function(models){
        reply.belongsTo(models.posts, {
            onDelete:'cascade',
            foreignKey: {
                allowNull: false,
              },
        })
      };

    return reply;
  };