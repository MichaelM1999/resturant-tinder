module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Client
    // A Post can't be created without an Client due to the foreign key constraint
    Post.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
