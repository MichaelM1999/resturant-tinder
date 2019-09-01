$(document).ready(function () {
    //click function
$("#Btn").click(function (e) {
    e.preventDefault();
    console.log("click!");
    let location = $("#location").val();
    $.ajax("/api/restaurant/location", {
        type: "POST",
        data:{location}
        })
})
//nav bar movement
$(function () {
    $('.nav-expand').click(e => {
        e.preventDefault();
    
        // $('.nav-container').css('clip-path', 'circle(100%)');
    
        $('.nav-container').toggleClass('full-circle');
    });
});
});