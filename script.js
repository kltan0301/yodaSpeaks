$(function() {
  'use strict';
  // cache the desired selectors
  var $btn = $('button');
  var $loader = $('.loader');
  var $displayBox = $('.yoda-quote');
  var $input = $('.quote');
  var api_url = "https://yoda.p.mashape.com/yoda";
  var queryText;

  $btn.on('click', function() {
    //check if input field is empty
    if ($input.val().length === 0) {
      queryText = "Yoda knows you did not enter anything.";
    }

    else if ($input.val().length > 80) {
      queryText = "Yoda knows you talk too much.";
    }

    else {
      queryText = $input.val();
    }

    $.ajax({
      // define api url
      url: api_url,
      headers: {
        "X-Mashape-Key": "pAgwZAVXS5mshWilYZFRNR74a0bup16CtsdjsnR1K1VWljuIku"
      },
      //data to be sent
      data: {
        sentence: queryText
      },
      //loader bar while waiting for response
      beforeSend: function() {
        $loader.show();
      }
    }).done(function(data) {
      //update display with response
      $displayBox.text(data);
      $loader.hide();
    }).fail(function(request, textStatus, errorThrown) {
      // hide loader bar and display error
      $loader.hide();
      $displayBox.text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    });
  });
});
