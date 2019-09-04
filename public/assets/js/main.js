$(function() {
    const emojis = {
        tearsOfJoy: "&#x1F602;",
        openMouthSmile: "&#x1F604;",
        wink: "&#x1F609;",
        blushSmile: "&#x1F60A;",
        tongueOut: "&#x1F60B;",
        sunglassesSmile: "&#x1F60E;",
        heartEyes: "&#x1F60D;",
        normalSmile: "&#x1F642;",
        thinking: "&#x1F914;",
        neutral: "&#x1F610;",
        rollingEyes: "&#x1F644;",
        smirk: "&#x1F60F;",
        zippedShut: "&#x1F910;",
        sleepy: "&#x1F62A;",
        drooling: "&#x1F924;",
        astonished: "&#x1F632;",
        confused: "&#x1F615;",
        confounded: "&#x1F616;",
        disappointed: "&#x1F61E;",
        worried: "&#x1F61F;",
        slightlyCrying: "&#x1F622;",
        loudlyCrying: "&#x1F62D;",
        furious: "&#x1F621;",
        lying: "&#x1F925;",
        sickFace: "&#x1F922;",
        poop: "&#x1F4A9;",
        thumbsUp: "&#x1F44D;",
        thumbsDown: "&#x1F44E;",
        bread: "&#x1F35E;",
        pancakes: "&#x1F95E;",
        bacon: "&#x1F953;",
        burger: "&#x1F354;",
        salad: "&#x1F957;",
        pizza: "&#x1F355;",
        fries: "&#x1F35F;",
        hotdog: "&#x1F32D;",
        taco: "&#x1F32E;",
        burrito: "&#x1F32F;",
        bentoBox: "&#x1F371;",
        rice: "&#x1F35A;",
        noodles: "&#x1F35C;",
        spaghetti: "&#x1F35D;",
        sushi: "&#x1F363;",
        iceCream: "&#x1F366;",
        doughnut: "&#x1F369;",
        cookie: "&#x1F36A;",
        birthdayCake: "&#x1F382;",
        chocolate: "&#x1F36B;",
        hotMug: "&#x2615;",
        bottleWithCork: "&#x1F37E;",
        wineGlass: "&#x1F377;",
        cocktail: "&#x1F378;",
        beer: "&#x1F37B;",
        sunrise: "&#x1F305;",
        slotMachine: "&#x1F3B0;",
        hourGlass: "&#x23F3;",
        snowflake: "&#x2744;",
        firstPlace: "&#x1F947;",
        secondPlace: "&#x1F948;",
        thirdPlace: "&#x1F949;",
        ATMsign: "&#x1F3E7;",
        restroomSign: "&#x1F6BB;",
        noEntry: "&#x1F6AB;",
        noSmoking: "&#x1F6AD;",
        musicNotes: "&#x1F3B6;",
        microphone: "&#x1F3A4;"
    };

    showEmojies(emojis);

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

function showEmojies(emojiObj) {
    let i = 0;
    let emojiHexCode = Object.values(emojiObj);
    let emojiNames = Object.keys(emojiObj);
    // console.log(emojiHexCode);
    // console.log(emojiNames);
    let $container = $('.simplebar-content');
    emojiHexCode.forEach(emoji => {
        let $reaction = $('<div>').addClass('reactions').html(emoji);
        let $reactionCount = $('<p>').addClass('reactions__count').html('100');
        $reaction.append($reactionCount);
        $container.append($reaction);
    });
}
