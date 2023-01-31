module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: True,
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