$(document).ready(function () {
    //click function
    $("#locationBtn").click(function (e) { 
        e.preventDefault();
        let location = $("#locationBtn").val();
        const apikey = "4hs0qXHyZpV04YNTnsU9vCo303f0S_IY_YLcbl5VjyvbMzLc2W4LTNUlEoO5OyNjPathUBmWoPWRS1lTJDv57LMLVc_03jb4sORlvu7ppJgh8VmJuf1NlCc9gthlXXYx"
        const url = "https://api.yelp.com/v3/businesses/search?term=food&location=" + location + "&total=100&catagories=food&apikey="+ apikey;
        $.ajax({
            url:url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    });
    })