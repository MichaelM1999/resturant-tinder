module.exports = function(sequelize, DataTypes) {
  const Client= sequelize.define("Client", {
    // Giving the Client model a name of type STRING
    name: DataTypes.STRING
  });

  Client.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
   Client.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Client;
};
