module.exports = function(sequelize, DataTypes) {
    let Restaurant = sequelize.define("Restaurant", {
        business_id: {
            type: DataTypes.STRING,
            allowNull: false
            // primaryKey: true
        },
        name: {
            type: DataTypes.STRING
            // allowNull: false
        },
        tearsOfJoy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        openMouthSmile: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        wink: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        blushSmile: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tongueOut: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sunglassesSmile: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        heartEyes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        normalSmile: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        thinking: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        neutral: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        rollingEyes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        smirk: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sleepy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        drooling: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        astonished: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        confused: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        confounded: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        disappointed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        worried: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        loudlyCrying: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        furious: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        lying: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sickFace: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        poop: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        thumbsUp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        thumbsDown: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        firstPlace: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        secondPlace: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        thirdPlace: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    });
    Restaurant.associate = function(models) {
        Restaurant.belongsTo(models.emoji, {

            foreignKey: {
                allowNull: false
            }
        });
    }
    return Restaurant;
};
