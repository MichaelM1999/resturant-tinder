$(function() {
    // const emojis = {
    //     tearsOfJoy: "&#x1F602;",
    //     openMouthSmile: "&#x1F604;",
    //     wink: "&#x1F609;",
    //     blushSmile: "&#x1F60A;",
    //     tongueOut: "&#x1F60B;",
    //     sunglassesSmile: "&#x1F60E;",
    //     heartEyes: "&#x1F60D;",
    //     normalSmile: "&#x1F642;",
    //     thinking: "&#x1F914;",
    //     neutral: "&#x1F610;",
    //     rollingEyes: "&#x1F644;",
    //     smirk: "&#x1F60F;",
    //     sleepy: "&#x1F62A;",
    //     drooling: "&#x1F924;",
    //     astonished: "&#x1F632;",
    //     confused: "&#x1F615;",
    //     confounded: "&#x1F616;",
    //     disappointed: "&#x1F61E;",
    //     worried: "&#x1F61F;",
    //     loudlyCrying: "&#x1F62D;",
    //     furious: "&#x1F621;",
    //     lying: "&#x1F925;",
    //     sickFace: "&#x1F922;",
    //     poop: "&#x1F4A9;",
    //     thumbsUp: "&#x1F44D;",
    //     thumbsDown: "&#x1F44E;",
    //     firstPlace: "&#x1F947;",
    //     secondPlace: "&#x1F948;",
    //     thirdPlace: "&#x1F949;"
    // };

    let catagories = [
        "Breakfast",
        "lunch",
        "Dinner",
        "Desert",
        "Mexican",
        "American",
        "Greek",
        "Chineese",
        "Asian",
        "Fast Food",
        "Sit Down",
        "fine dining",
        "Pizzia",
        "Tacos",
        "Smoothies",
        "IceCream",
        "Bakeries",
        "breweries",
        "Coffee",
        "Fishmonger",
        "Poke",
        "Pretzels",
        "Water Stores",
        "Sex Therapists",
        "Food Banks",
        "Boat Repair",
        "Post Offices",
        "Belgian",
        "Barbeque",
        "Burgers",
        "Caribbean",
        "Chilean",
        "Comfort Food",
        "Food Court",
        "Hawaiian"
    ];
    // for (let i = 0; i < catagories.length; i++){
    //     emoji = catagories[i];
    //     $(".mdi-menu-down").append(emoji);
    // }


    // EXPAND /RETRACT MENU
    $(".nav-expand").click(e => {
        e.preventDefault();
        $(".nav-container").toggleClass("full-circle");
    });

    //initialize swiper when document ready
    const mySwiper = new Swiper(".app-container", {
        // Optional parameters
        direction: "horizontal",
        centeredSlides: true,
        loop: true,
        effect: "coverflow",
        speed: 700,
        resistence: false,
        resistenceRatio: 0.5,
        grabCursor: true,
        //   // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
        //   // And if we need scrollbar
        //   scrollbar: {
        //     el: '.swiper-scrollbar',
        //   }
    });

    // HANDLE SUBMITTING LOCATION DATA EVENT
    $(".search__form").on("submit", function(e) {
        e.preventDefault();
        getLocation(
            $("#location")
                .val()
                .trim()
        );
    });

});
function getLocation(location) {
    // $.get(`/api/location/${location}`, data => {
    //     let businesses = data.detailsArr;
    //     console.log(JSON.stringify(businesses));
        window.location.href = `/app/${location}`;
    // });
}

// function showEmojies(emojiObj) {
//     let i = 0;
//     let emojiHexCode = Object.values(emojiObj);
//     let emojiNames = Object.keys(emojiObj);
//     // console.log(emojiHexCode);
//     // console.log(emojiNames);
//     let $container = $('.reactions--container .simplebar-content');
//     emojiHexCode.forEach(emoji => {
//         let $reaction = $('<div>').addClass('reactions').html(emoji);
//         let $reactionCount = $('<p>').addClass('reactions__count').html('100');
//         $reaction.append($reactionCount);
//         $container.append($reaction);
//     });
// }
