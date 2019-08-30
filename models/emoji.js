module.exports = function(sequelize, DataTypes) {
  const Emoji= sequelize.define("Emoji", {
    // Giving the Emoji model a name of type STRING
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });

 Emoji.associate = function(models) {
    // Associating Emoji with Posts
    // When an Emoji is deleted, also delete any associated Posts
  Emoji.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Emoji;
};
