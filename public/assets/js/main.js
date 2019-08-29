$(function () {
    $('.nav-expand').click(e => {
        e.preventDefault();
    
        // $('.nav-container').css('clip-path', 'circle(100%)');
    
        $('.nav-container').toggleClass('full-circle');
    });
});