module.exports = function(sequelize, DataTypes) {
    let emoji = sequelize.define("emoji", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type:DataTypes.TEXT,
            allowNull:false
        }
    });
}