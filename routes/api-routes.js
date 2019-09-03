const axios = require("axios");
require("dotenv").config();
const db = require("../models");
const path = require("path");

module.exports = app => {
    let detailsArr = [];
    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ]

    // GET LOCATION INPUT
    app.get("/api/location/:location", (req, res) => {
        let location = req.params.location;
        location = location.replace(/ /g, "+");

        // GET LIST OF BUSINESSES
        axios
            .get(
                `https://api.yelp.com/v3/businesses/search?location=${location}&limit=5`,
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
                            const hoursArr = response.data.hours[0].open;
                            // console.log(business.id);
                            // console.log(JSON.stringify(hoursArr, null, 4));
                            const data = response.data;
                            // db.Restaurant.findOrCreate({
                            //     where: {
                            //         business_id: business.id,
                            //         name: data.name
                            //     }
                            // }).then(([businessData, isNew]) => {
                            //     // console.log(businessData);
                            //     // BUILD DATA OBJECT FOR INPUTTING INTO HTML
                            // });
                            let details = {
                                name: data.name,
                                images: data.photos,
                                categories: data.categories,
                                rating: data.rating,
                                address: data.location.display_address,
                                hours: {}
                            };
                            for (let i = 0; i < hoursArr.length; i++) {
                                details.hours[days[i]] = {
                                    day: i,
                                    start: data.hours[0].open[i].start,
                                    end: data.hours[0].open[i].end,
                                    is_overnight:
                                        data.hours[0].open[i].is_overnight
                                };
                            }
                            if (!details.hours[days[6]]) {
                                details.hours[days[6]] = {
                                    day: 6,
                                    start: 'closed',
                                    end: null,
                                    is_overnight: null
                                }
                            }
                            detailsArr.push(details);
                            // console.log(details);
                            k++;
                            if (k === businesses.length - 1) {
                                console.log(`
                                ---------------------------------------------------------------------------------------------------
                                
                                
                                
                                
                                
                                
                                
                                BELOW IS THE FULL DETAILS ARRAY BEING PUSHED TO THE FRONT END`);
                                console.log(JSON.stringify(detailsArr, null, 4));

                                res.render(
                                    path.join(__dirname, "../views/app"), detailsArr);
                            }
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

// async () => {
//     const response = await axios({
//         url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
//         method: 'get',
//         headers: {
//             Authorization: `Bearer zT-NE6SqMZnisId6E3Ayl3yc9So38bG957gHzePHJXWymuPiJS2w0k-pYV4jmqoel4hoIaCSTJfL423bt8pcLb_CfKuE9fWuPH7_WaPSeGN1YJG1JtwFVOkwnKhpXXYx`
//         }
//     });
// }
