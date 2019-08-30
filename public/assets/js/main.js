$(document).ready(function () {
    //click function
    
    let restaurantsArr= [];
    $("#Btn").click(function (e) { 
        console.log("click!");
        e.preventDefault();
        let location = $("#location").val();
        const apikey = "0eb0881917e5b1d57a0d1780cef91180"
        const url = "https://developers.zomato.com/api/v2.1/locations?query="+ location+"&apikey="+ apikey;
        $.ajax({
            url:url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let id = response.location_suggestions[0].entity_id;
            let type = response.location_suggestions[0].entity_type;
            const url2 = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + id + "&entity_type=" + type + "&apikey="+ apikey
           console.log(id);
           console.log(type);
            $.ajax({
                url: url2,
                method:"GET"
            }).then(function (response) {
                console.log(response.best_rated_restaurant);
                for (let i = 0; i < response.best_rated_restaurant.length; i++){
                    console.log("hi");
                    let r = response.best_rated_restaurant[i];
                    let name = response.best_rated_restaurant[i].restaurant.name;
                    let adress = response.best_rated_restaurant[i].restaurant.location.address;
                    // console.log(name);
                    // console.log(adress);
                    
                    let restaurant = {
                        name: name,
                        address: adress
                    }

                    restaurantsArr.push(restaurant);
                    // console.log(restaurantsArry);
                }
                console.log(restaurantsArr);
                $.ajax("/api/restaurant/location", {
                    type: "POST",
                    data:{restaurantsArr}
                }).then(res => {
                    
                    // console.log(restaurantsArry.length);
                    console.log(res)
                });
            });
        });
    });
})
$(function () {
    $('.nav-expand').click(e => {
        e.preventDefault();
    
        // $('.nav-container').css('clip-path', 'circle(100%)');
    
        $('.nav-container').toggleClass('full-circle');
    });
});
