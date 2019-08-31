const axios = require("axios");

// app.get("/contact", function (req, res) {
//   res.render(path.join(__dirname, "/views/contact"));
// });
// app.get("/api/:location", function (req, res) {
//   // res.render(path.join(__dirname, "/views/index.handlebars"));
//   //ajax call using req.params
//   //app.post to server from front end
//   //push to array
//   // render using handle bars
// });


module.exports = (app) => {
    app.get('/api/location/:location', (req,res) => {
        let location = req.params.location;
        location = location.replace(/ /g, '+');
        console.log(location);
        axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}`, {
            headers: {
                Authorization: `Bearer zT-NE6SqMZnisId6E3Ayl3yc9So38bG957gHzePHJXWymuPiJS2w0k-pYV4jmqoel4hoIaCSTJfL423bt8pcLb_CfKuE9fWuPH7_WaPSeGN1YJG1JtwFVOkwnKhpXXYx`
            }
        }).then(response => {
            console.log(response.data.businesses[0]);
            res.json(response.data.businesses[0]);
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