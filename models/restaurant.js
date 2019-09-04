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
        zippedShut: {
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
        slightlyCrying: {
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
        bread: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pancakes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        bacon: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        burger: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        salad: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pizza: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        fries: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hotdog: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        taco: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        burrito: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        bentoBox: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        rice: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        noodles: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        spaghetti: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sushi: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        iceCream: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        doughnut: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cookie: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        birthdayCake: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        chocolate: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hotMug: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        bottleWithCork: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        wineGlass: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cocktail: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        beer: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sunrise: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        slotMachine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hourGlass: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        snowflake: {
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
        },
        ATMsign: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        restroomSign: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        noEntry: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        noSmoking: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        musicNotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        microphone: {
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
