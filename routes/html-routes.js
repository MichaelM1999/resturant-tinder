const axios = require("axios");
require("dotenv").config();
const db = require("../models");
const moment = require("moment");
const _ = require("lodash");

module.exports = app => {
    // LANDING PAGE
    app.get("/", function(req, res) {
        res.render("index");
    });
    let offset = 0;

    const emojiName_Hex = {
        tearsOfJoy: "😂",
        openMouthSmile: "😄",
        wink: "😉",
        blushSmile: "😊",
        tongueOut: "😋",
        sunglassesSmile: "😎",
        heartEyes: "😍",
        normalSmile: "🙂",
        thinking: "🤔",
        neutral: "😐",
        rollingEyes: "🙄",
        smirk: "😏",
        sleepy: "😪",
        drooling: "🤤",
        astonished: "😲",
        confused: "😕",
        confounded: "😖",
        disappointed: "😞",
        worried: "😟",
        loudlyCrying: "😭",
        furious: "😡",
        lying: "🤥",
        sickFace: "🤢",
        poop: "💩",
        thumbsUp: "👍",
        thumbsDown: "👎",
        firstPlace: "🥇",
        secondPlace: "🥈",
        thirdPlace: "🥉"
    };

    const emojiHex = Object.values(emojiName_Hex);

    app.get("/app/:location", (req, res) => {
        let location = req.params.location;
        location = location.replace(/ /g, "+");
        let detailsArr = [];
        const days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ];
        // GET LIST OF BUSINESSES
        axios
            .get(
                `https://api.yelp.com/v3/businesses/search?location=${location}&categories=food,bars,restaurants&limit=5&price=4`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                }
            )
            .then(response => {
                const businesses = response.data.businesses;
                let k = 0;

                //LOOP THROUGH ALL BUSINESSES & MAKE 2ND CALL TO YELP TO GET BUSINESS DETAILS FOR EACH
                getBusinessDetails(businesses, k, days, detailsArr, res);
            })
            .catch(err => {
                if (err) throw err;
            });
    });

    app.get("/app/:location/:offset", (req, res) => {
        offset = req.params.offset;
        console.log("=====================================================");
        console.log("=====================================================");
        console.log("THE OFFSET IS " + offset);
        console.log("=====================================================");
        console.log("=====================================================");

        let location = req.params.location;
        location = location.replace(/ /g, "+");
        let detailsArr = [];
        const days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ];
        // GET LIST OF BUSINESSES
        axios
            .get(
                `https://api.yelp.com/v3/businesses/search?location=${location}&categories=food,bars,restaurants&limit=5&price=4&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                }
            )
            .then(response => {
                const businesses = response.data.businesses;
                let k = 0;
                console.log(businesses);

                //LOOP THROUGH ALL BUSINESSES & MAKE 2ND CALL TO YELP TO GET BUSINESS DETAILS FOR EACH
                getBusinessDetails(businesses, k, days, detailsArr, res);
            })
            .catch(err => {
                if (err) throw err;
            });
    });

    function getBusinessDetails(businesses, k, days, detailsArr, res) {
        businesses.forEach(business => {
            axios
                .get(`https://api.yelp.com/v3/businesses/${business.id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                })
                .then(response => {
                    let details;
                    let emojiKeys, emojiValues;
                    const data = response.data;
                    db.Restaurant.findOrCreate({
                        where: {
                            business_id: business.id,
                            name: data.name
                        }
                    })
                        .then(([businessData, isNew]) => {
                            emojiKeys = _.drop(
                                Object.keys(businessData.dataValues),
                                3
                            );
                            emojiValues = _.drop(
                                Object.values(businessData.dataValues),
                                3
                            );
                            return [emojiKeys, emojiValues];
                        })
                        .then(emojis => {
                            let emojiArr = [];
                            for (let i = 0; i < emojiHex.length; i++) {
                                emojiArr.push({
                                    name: emojis[0][i],
                                    count: emojis[1][i],
                                    hex: emojiName_Hex[emojis[0][i]]
                                });
                            }

                            details = {
                                id: business.id,
                                name: data.name,
                                images: data.photos,
                                categories: data.categories,
                                rating: data.rating,
                                price: data.price,
                                address: data.location.display_address,
                                url: data.url,
                                phone: data.display_phone,
                                emojis: emojiArr,
                                hours: {}
                            };
                            if (data.hours) {
                                for (
                                    let i = 0;
                                    i < data.hours[0].open.length;
                                    i++
                                ) {
                                    let timeObj = data.hours[0].open[i];
                                    let start = moment(
                                        timeObj.start,
                                        "HHmm"
                                    ).format("hh:mm A");
                                    let end = moment(timeObj.end, "HHmm").format(
                                        "hh:mm A"
                                    );
                                    details.hours[days[i]] = {
                                        day: i,
                                        start: start,
                                        end: end
                                    };
                                }
                                for (let i = 0; i <= 6; i++) {
                                    if (!details.hours[days[i]]) {
                                        details.hours[days[i]] = {
                                            day: i,
                                            start: "closed",
                                            end: null
                                        };
                                    }
                                }
                            }
                            detailsArr.push(details);
                            k++;
                            if (k === businesses.length) {
                                res.render("app", {
                                    businesses: detailsArr
                                });
                            }
                        });
                })
                .catch(err => {
                    if (err) throw err;
                });
        });
    }
};
