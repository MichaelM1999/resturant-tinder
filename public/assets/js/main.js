$(function() {
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
        effect: 'coverflow',
        speed: 700,
        resistence: false,
        resistenceRatio: .5,
        grabCursor: true,
        //   // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
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
    $.get(`/api/location/${location}`, data => {
        let businesses = data.detailsArr;
        console.log(businesses);
        if (window.location.href != "/app") {
            window.location.href = "/app";
        }
    });
}
