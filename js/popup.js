$(document).ready(function () {

    //First set height!
    setHeight()

    //BEGIN Section: Selctors

    $('.flip-container').click(function () {
        flipCard();
    });

    $('#flipButton').click(function () {
        flipAllCards();
    });

    function test () {
        console.log("yes");
    }

    //load imprint when clicking on the "i"
    $('#imprint').click(function() {
        // $('html').load('imprint.html');
        window.location.href = "imprint.html";
    });

    //go back to landing page
    $('#back-arrow').click(function() {
        window.location.href = "popup.html";
    });


    //END Section: Selectors


    //BEGIN Section: Methods

    function setHeight() {
        var frontHeight = $('.front').outerHeight();
        var backHeight = $('.back').outerHeight();

        if (frontHeight > backHeight) {
            $('.flip-container, .card, .back').height(frontHeight);
        }
        else if (frontHeight > backHeight) {
            $('.flip-container, .card, .front').height(backHeight);
        }
        else {
            $('.flip-container, .card, .front').height(backHeight);
        }
    }

    function flipCard() {
        $('.card').flip({
            //some optional stuff for flipping animation
            axis: 'x',
            //trigger: 'hover',
            speed:200});
    }

    function flipAllCards() {
        //should do flipping and unflipping of all cards
        let cards = document.getElementsByClassName("card");


        // $('.card').each(function () {
        //     console.log(this);
        //     $('.card').flip({
        //         //some optional stuff for flipping animation
        //         axis: 'x',
        //         //trigger: 'hover',
        //         speed:200})
        // });

        for (i = 0; i < cards.length; i++){
            cards[i].flip(true);


            /*$('.card').flip({
            //some optional stuff for flipping animation
            axis: 'x',
            //trigger: 'hover',
            speed:200,
            });
            //flipCard(card);

            //$(cards[i]).flip({
             //   //some optional stuff for flipping animation
               // axis: 'x',
                //trigger: 'hover',
                //speed:200});*/
        }
    }

    // Update UI based on nutrition data
    function updateUi(data) {
        // hide loading animation
        $('#nutrition_loading').hide();


        if (data.error != null) {
            // show error
            $('#nutrition_explanation').text(data.error);
        } else {
            // for each nutrition label, create a bar chart
            labels = ['influence', 'virality', 'readability', 'sentiment', 'objectivity']
            labels.forEach(label => {
                let labelData = data.nutrition[label];
                let backSide = $('#card_' + label + ' .back');
                let mainScore = Math.round(labelData.main_score);

                backSide.append(createHBar(mainScore, mainScore));
                backSide.append('<div class="main-score-spacer"></div>');
                
                let first = true;
                labelData.subfeatures.forEach(subfeature => {
                    if (!first) {
                        backSide.append('<div class="subfeature-spacer"></div>');
                    }
                    first = false;

                    let shortName = subfeature.name.length < 12
                        ? subfeature.name
                        : subfeature.name.substring(0, 10) + '..';
                    backSide.append(createHBar(subfeature.percentage, shortName + ': ' + Math.round(subfeature.value), subfeature.name));
                });
            });
        }
    }

    function createHBar(percentage, text, tooltip) {
        let hbar = $(`
            <div class='hbar'
                 style='background: linear-gradient(to right, #3a4b8b ${percentage}% , #ccc ${percentage}%);'
                 title='${tooltip}'>
                ${text}
            </div>
        `);
        hbar.tooltip();
        return hbar;
    }

    function updateExplanation(text) {
        $('#nutrition_explanation').text(text);
    }

    //END Section: Methods


// get the URL currently opened tab
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        var http_params = {
            "url": url
        };

        var bg = chrome.extension.getBackgroundPage();
        bg.getNutritionLabels(url, updateUi);
    });



});

