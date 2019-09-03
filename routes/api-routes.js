const axios = require("axios");
require("dotenv").config();


module.exports = (app) => {
    let detailsArr = [];

    // GET LOCATION INPUT
    app.get('/api/location/:location', (req,res) => {
        let location = req.params.location;
        location = location.replace(/ /g, '+');

        // GET LIST OF BUSINESSES
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&limit=${5}`, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`
            }
        }).then(response => {
            const businesses = response.data.businesses;

            //LOOP THROUGH ALL BUSINESSES & MAKE 2ND CALL TO YELP TO GET BUSINESS DETAILS FOR EACH
            businesses.forEach(business => {
                axios.get(`https://api.yelp.com/v3/businesses/${business.id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    }
                }).then(response => {
                    const data = response.data;

                    // BUILD DATA OBJECT FOR INPUTTING INTO HTML 
                    let details = {
                        name: data.name,
                        images: data.photos,
                        categories: data.categories,
                        rating: data.rating,
                        address: data.location.display_address,
                        hours: {
                            monday: {
                                day: 0,
                                start: data.hours[0].open[0].start,
                                end: data.hours[0].open[0].end,
                                is_overnight: data.hours[0].open[0].is_overnight
                            },
                            tuesday: {
                                day: 1,
                                start: data.hours[0].open[1].start,
                                end: data.hours[0].open[1].end,
                                is_overnight: data.hours[0].open[1].is_overnight
                            },
                            wednesday: {
                                day: 2,
                                start: data.hours[0].open[2].start,
                                end: data.hours[0].open[2].end,
                                is_overnight: data.hours[0].open[2].is_overnight
                            },
                            thursday: {
                                day: 3,
                                start: data.hours[0].open[3].start,
                                end: data.hours[0].open[3].end,
                                is_overnight: data.hours[0].open[3].is_overnight
                            },
                            friday: {
                                day: 4,
                                start: data.hours[0].open[4].start,
                                end: data.hours[0].open[4].end,
                                is_overnight: data.hours[0].open[4].is_overnight
                            },
                            saturday: {
                                day: 5,
                                start: data.hours[0].open[5].start,
                                end: data.hours[0].open[5].end,
                                is_overnight: data.hours[0].open[5].is_overnight
                            },
                            sunday: {
                                day: 6,
                                start: data.hours[0].open[6].start,
                                end: data.hours[0].open[6].end,
                                is_overnight: data.hours[0].open[6].is_overnight
                            },
                        }
                    }
                    detailsArr.push(details);
                    console.log(`
                    ---------------------------------------------------------------------------------------------------
                    ---------------------------------------------------------------------------------------------------`);     
                    console.log(detailsArr);
                    res.json({detailsArr});
                })
            }).catch(err => {
                if (err) throw err;
            });
        }).catch(err => {
            if (err) throw err;
        });
    });
}

// async () => {
//     const response = await axios({
//         url: `https://api.yelp.com/v3/businesses/search?location=${location}`,
//         method: 'get',
//         headers: {
//             Authorization: `Bearer zT-NE6SqMZnisId6E3Ayl3yc9So38bG957gHzePHJXWymuPiJS2w0k-pYV4jmqoel4hoIaCSTJfL423bt8pcLb_CfKuE9fWuPH7_WaPSeGN1YJG1JtwFVOkwnKhpXXYx`
//         }
//     });
// }