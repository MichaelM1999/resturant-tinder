$(function() {

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
    localStorage.setItem("offset", 0);
    // let ;

    // EXPAND /RETRACT MENU
    $(".nav-expand").click(e => {
        e.preventDefault();
        $(".nav-container").toggleClass("full-circle");
    });

    $('.reactions').click(function (e) { 
        e.preventDefault();
        if ($(this).data('clicked') === false) {
            const emojiName = $(this).attr("id");
            const index = $(this).data("index");
            const id = $(this).data("id");
            const countContainer = $(this).children(".reactions__count");
            let count = parseInt(countContainer.text());
            count++;
            console.log(`Count: ${count}`);
            console.log(`Emoji Name: ${emojiName}`);
            console.log(`Index: ${index}`);
            $(this).data('clicked', true);
            console.log($(this).data("clicked"));
            const emojiData = {
                name: emojiName,
                index: index,
                count: count,
                id: id
            }

            $.ajax({
                method: "PUT",
                url: "/api/countUpdate",
                data: emojiData
            }).then(() => {
                console.log("it's been updated!");
                countContainer.text(count);
            });
            // $.put("/api/countUpdate", emojiData, () => {
            // })
        }
    });

    //initialize swiper when document ready
    const mySwiper = new Swiper(".app-container", {
        // Optional parameters
        direction: "horizontal",
        centeredSlides: true,
        // loop: true,
        effect: "coverflow",
        coverflowEffect: {
            slideShadows: false,
            depth: 300,
            modifier: 1.5
        },
        speed: 1000,
        resistence: false,
        resistenceRatio: 0.125,
        grabCursor: true,

        //   // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    // HANDLE SUBMITTING LOCATION DATA EVENT

    $(".search__form").on("submit", function(e) {
        e.preventDefault();
        localStorage.setItem("area", $("#location").val().trim());
        getLocation(
            $("#location")
                .val()
                .trim()
        );
    });

    $('.arrow-btn').click(function (e) { 
        e.preventDefault();
        let btn = $(this);

        btn.addClass('rotate');
        setTimeout(() => {
            btn.removeClass('rotate');
        }, 1000);

        checkIfLast();
    });

    mySwiper.on('slideChangeTransitionStart sliderMove', () => {
        checkIfLast();
    })

});

function getLocation(location) {
    window.location.href = `/app/${location}`;
}

function showMoreData() {
    let offset = parseInt(localStorage.offset);
    let location = localStorage.area;
    offset += 3;
    console.log(offset);
    localStorage.setItem("offset", offset);

    window.location.href = `/app/${location}/${offset}`;
}

function checkIfLast() {
    if (document.getElementsByClassName('swiper-slide-next').length === 0) {
        console.log("No More Slides!");
        $('.swiper-button-next').removeClass('swiper-button-disabled');
        showMoreData();
    }
}
