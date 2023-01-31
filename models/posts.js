module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
      post_id: {
        type: DataTypes.UUID,
        allowNull: False,
        unique: True,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: False,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: False,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: False,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: False,
      },
      user_id:{
        type: DataTypes.UUID,
        allowNull: False,
        unique: True,
    },
    });

    post.associate = function (models) {
        post.hasMany(models.replies, {
        foreignKey: 'post_id',
        onDelete: 'cascade',
      });
    };

    post.associate = function(models){
      post.belongsTo(models.users, {
          onDelete:'cascade',
          foreignKey: {
              allowNull: false,
            },
      })
    };

    return post;
  };