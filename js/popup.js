$(document).ready(function () {

    $('.flip-container').click(function(){
        $('.card').flip();
        return false;
    }).mouseleave(function () {
        $('.flip-container > .card').removeClass('flipped');
    });

    var frontHeight = $('.front').outerHeight();
    var backHeight = $('.back').outerHeight();

    if (frontHeight > backHeight) {
        $('.flip-container, .back').height(frontHeight);
    }
    else if (frontHeight > backHeight) {
        $('.flip-container, .front').height(backHeight);
    }
    else {
        $('.flip-container').height(backHeight);
    }

    //this should load the imprint when clicking on the "i"
    $('.row.plugin-name').click(function () {
        $('.img-fluid').load('imprint.html')
    })
    })