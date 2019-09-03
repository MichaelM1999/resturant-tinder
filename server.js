const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//put into public folder so that js and css all serve;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
app.get("/", function (req, res) {
  res.render(path.join(__dirname, "/views/index"));
});
app.get("/app", function (req, res) {
  res.render(path.join(__dirname, "/views/app"));
});
app.get("/contact", function (req, res) {
  res.render(path.join(__dirname, "/views/contact"));
});



app.get("/restaurants", function (req, res){
  res.render(path.join(__dirname, "/views/carousel"));
});


app.post("/api/restaurant/location", function (req, res) {
  console.log("working")
  let restaurantsArr= [];
  let location = req.body;
  const apikey = "0eb0881917e5b1d57a0d1780cef91180"
  const url = "https://developers.zomato.com/api/v2.1/locations?query="+ location+"&apikey="+ apikey;
  axios.get(url).then(
  function(response) {
    // console.log(response);
    let id = response.location_suggestions[0].entity_id;
    let type = response.location_suggestions[0].entity_type;
    const url2 = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + id + "&entity_type=" + type + "&apikey="+ apikey
    console.log(id);
    console.log(type);
    axios.get(url2).then(
      function(response) {
        // console.log(response.best_rated_restaurant);
        for (let i = 0; i < response.best_rated_restaurant.length; i++){
          console.log("hi");
          let r = response.best_rated_restaurant[i];
          let name = response.best_rated_restaurant[i].restaurant.name;
          let adress = response.best_rated_restaurant[i].restaurant.location.address;
          let phoneNum = response.best_rated_restaurant[i].restaurant.phone_numbers;
          let pic = response.best_rated_restaurant[i].restaurant.photos[0].photo.url;
          let hours = response.best_rated_restaurant[i].restaurant.timings;
          let rating = response.best_rated_restaurant[i].restaurant.user_rating.aggregate_rating;
          let votes = response.best_rated_restaurant[i].restaurant.user_rating.votes;
          // console.log(name);
          // console.log(adress);
          
          let restaurant = {
            name: name,
            address: adress,
            phoneNum: phoneNum,
            pic: pic,
            hours: hours,
            rating: rating,
            votes: votes
            
          }
          
          restaurantsArr.push(restaurant);
          // console.log(restaurantsArry);
        }
        console.log(restaurantsArr);
      });
    })
  });
  
  //listening on ***
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
    });
    // $.ajax({
      //   url:url,
      //   method: "GET"
      // }).then(function (response) {
        //   console.log(response);
        //   let id = response.location_suggestions[0].entity_id;
        //   let type = response.location_suggestions[0].entity_type;
        //   const url2 = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + id + "&entity_type=" + type + "&apikey="+ apikey
        //   console.log(id);
        //   console.log(type);
        
        //   $.ajax({
          //     url: url2,
  //     method:"GET"
  //   }).then(function (response) {
  //     console.log(response.best_rated_restaurant);
  //     for (let i = 0; i < response.best_rated_restaurant.length; i++){
  //       console.log("hi");
  //       let r = response.best_rated_restaurant[i];
  //       let name = response.best_rated_restaurant[i].restaurant.name;
  //       let adress = response.best_rated_restaurant[i].restaurant.location.address;
  //       let phoneNum = response.best_rated_restaurant[i].restaurant.phone_numbers;
  //       let pic = response.best_rated_restaurant[i].restaurant.photos[0].photo.url;
  //       let hours = response.best_rated_restaurant[i].restaurant.timings;
  //       let rating = response.best_rated_restaurant[i].restaurant.user_rating.aggregate_rating;
  //       let votes = response.best_rated_restaurant[i].restaurant.user_rating.votes;
  //       // console.log(name);
  //       // console.log(adress);
        
  //       let restaurant = {
  //         name: name,
  //         address: adress,
  //         phoneNum: phoneNum,
  //         pic: pic,
  //         hours: hours,
  //         rating: rating,
  //         votes: votes
          
  //       }
        
  //       restaurantsArr.push(restaurant);
  //       // console.log(restaurantsArry);
  //     }
  //     console.log(restaurantsArr);
      
      
      
      
  //     // res.render("/views/carousel", {restaurantsArr: req.body.restaurantsArr});
  //   });
  // });
  // res.send(req.body.restaurantsArr);
  
  // res.render(path.join(__dirname, "/views/carousel"));
  // res.send("I DID IT");
  // res.render(path.join(__dirname, "/views/index.handlebars"));
  //ajax call using req.params
  //app.post to server from front end
  //push to array 
  // render using handle bars
