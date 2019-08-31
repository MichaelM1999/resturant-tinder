
$(function () {
    // EXPAND /RETRACT MENU
    $('.nav-expand').click(e => {
        e.preventDefault();    
        $('.nav-container').toggleClass('full-circle');
    });


    // HANDLE SUBMITTING LOCATION DATA EVENT
    $('.search__form').on('submit', function (e) {
        e.preventDefault();
        getLocation($('#location').val().trim());
    });
});

function getLocation(location) {

    $.get(`/api/location/${location}`, (data) => {
            let businesses = data.detailsArr;
            console.log(businesses);
            // window.location.href = "/app";
        }
    );
}