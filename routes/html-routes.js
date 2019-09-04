const path = require("path");
const axios = require("axios");

module.exports = (app) => {

    // LANDING PAGE
    app.get("/", function(req, res) {
        res.render("index");
    });

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
        console.log(location);
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
        ]
        // GET LIST OF BUSINESSES
        axios
            .get(
                `https://api.yelp.com/v3/businesses/search?location=${location}&limit=15`,
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
                            for (let i = 0; i < data.hours[0].open.length; i++) {
                                details.hours[days[i]] = {
                                    day: i,
                                    start: data.hours[0].open[i].start,
                                    end: data.hours[0].open[i].end,
                                    is_overnight:
                                        data.hours[0].open[i].is_overnight
                                };
                            }
                            if (!details.hours[days[6]]) {
                                console.log("This is where sunday is closed");
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
                            console.log(businesses.length);
                            if (k === businesses.length) {
                                console.log("made it in!");
                                // console.log(`
                                // -------------------------------------------------------------------------------------------------
                                // BELOW IS THE FULL DETAILS ARRAY BEING PUSHED TO THE FRONT END`);
                                // console.log(JSON.stringify(detailsArr, null, 4));
                                res.render("app", {businesses: detailsArr});
                                // res.json(detailsArr);
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
}
