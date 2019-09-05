const path = require("path");
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

    //   const emojis = [
    //       {
    //           name: cjnjcvnd,
    //           hex: jefnvj,
    //           count: 0
    //       },
    //       {
    //         name: cjnjcvnd,
    //         hex: jefnvj,
    //         count: 0
    //     },
    //     {
    //         name: cjnjcvnd,
    //         hex: jefnvj,
    //         count: 0
    //     }
    //   ]

      const emojiHex = Object.values(emojiName_Hex);

    // APP PAGE
    // app.get("/app/:location", function(req, res) {
    //     // res.render(path.join(__dirname, "../views/app"));
    //     // res.render("app", );
    //     console.log(req.params.location);
    //     console.log("This is before calling Yelp");
    //     axios.get(`/api/location/${req.params.location}`).then(data => {
    //         res.render("app", data.detailsArr);
    //     });
    // });

    app.get("/app/:location", (req, res) => {
        let location = req.params.location;
        // console.log(location);
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
                `https://api.yelp.com/v3/businesses/search?location=${location}&categories=food,bars,restaurants&limit=5`,
                {
                    // &categories=food,bars,restaurants&radius=30000
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                }
            )
            .then(response => {
                const businesses = response.data.businesses;
                let k = 0;
                //LOOP THROUGH ALL BUSINESSES & MAKE 2ND CALL TO YELP TO GET BUSINESS DETAILS FOR EACH
                businesses.forEach(business => {
                    axios
                        .get(
                            `https://api.yelp.com/v3/businesses/${business.id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.API_KEY}`
                                }
                            }
                        )
                        .then(response => {
                            let details;
                            let emojiKeys, emojiValues;
                            // console.log(business.id);
                            // console.log(JSON.stringify(hoursArr, null, 4));
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
                                    console.log(emojis);

                                    let emojiArr = [];
                                    for (let i = 0; i < emojiHex.length; i++) {
                                        emojiArr.push({
                                            name: emojis[0][i],
                                            count: emojis[1][i],
                                            hex: emojiName_Hex[emojis[0][i]]
                                        });
                                    }


                                    details = {
                                        name: data.name,
                                        images: data.photos,
                                        categories: data.categories,
                                        rating: data.rating,
                                        address: data.location.display_address,
                                        url: data.url,
                                        phone: data.display_phone,
                                        emojis: emojiArr,
                                        hours: {}
                                    };
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
                                        let end = moment(
                                            timeObj.end,
                                            "HHmm"
                                        ).format("hh:mm A");
                                        details.hours[days[i]] = {
                                            day: i,
                                            start: start,
                                            end: end,
                                            is_overnight:
                                                data.hours[0].open[i]
                                                    .is_overnight
                                        };
                                    }
                                    if (!details.hours[days[6]]) {
                                        console.log(
                                            "This is where sunday is closed"
                                        );
                                        details.hours[days[6]] = {
                                            day: 6,
                                            start: "closed",
                                            end: null,
                                            is_overnight: null
                                        };
                                    }
                                    detailsArr.push(details);
                                    console.log(details);
                                    k++;
                                    if (k === businesses.length) {
                                        console.log("made it in!");
                                        // console.log(`
                                        // -------------------------------------------------------------------------------------------------
                                        // BELOW IS THE FULL DETAILS ARRAY BEING PUSHED TO THE FRONT END`);
                                        // console.log(JSON.stringify(detailsArr, null, 4));
                                        res.render("app", {
                                            businesses: detailsArr
                                        });
                                        // res.json(detailsArr);
                                    }
                                });
                        })
                        .catch(err => {
                            if (err) throw err;
                        });
                });
                console.log(`
                ---------------------------------------------------------------------------------------------------`);
            })
            .catch(err => {
                if (err) throw err;
            });
    });
};
