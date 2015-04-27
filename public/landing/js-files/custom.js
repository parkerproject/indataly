// jQuery Initialization
jQuery(document).ready(function($) {
  "use strict";
  window._hash = window.location.hash;

  //======================================================================================================
  //      Fancy Box
  //======================================================================================================
  if ($('.lightbox, .button-fullsize, .fullsize').length > 0) {
    $('.lightbox, .button-fullsize, .fullsize').fancybox({
      padding: 0,
      margin: 0,
      maxHeight: '90%',
      maxWidth: '90%',
      loop: true,
      fitToView: false,
      mouseWheel: false,
      autoSize: false,
      closeClick: false,
      overlay: {
        showEarly: true
      },
      helpers: {
        media: {}
      }
    });
  }


  // ----------------- EASING ANCHORS ------------------ //

  $('a[href*=#]').click(function() {

    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

      var $target = $(this.hash);

      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');

      if ($target.length) {

        var targetOffset = $target.offset().top;

        $('html,body').animate({
          scrollTop: targetOffset
        }, 1000);

        return false;

      }

    }

  });


  $('#gototop').click(function(e) {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 750, 'linear');
    e.preventDefault();
    return false;
  });

  $("#submit_btn_13").click(function() {

    //get input field values
    var user_name = $('.pixfort_gym_13 input[name=name]').val();
    var user_email = $('.pixfort_gym_13 input[name=email]').val();
    var user_number = $('.pixfort_gym_13 input[name=number]').val();


    //simple validation at client's end
    //we simply change border color to red if empty field using .css()
    var proceed = true;

    if (user_name == "") {
      $('.pixfort_gym_13 input[name=name]').css('border-color', 'red');
      proceed = false;
    }
    if (user_number == "") {
      $('.pixfort_gym_13 input[name=number]').css('border-color', 'red');
      proceed = false;
    }
    if (user_email == "") {
      $('.pixfort_gym_13 input[name=email]').css('border-color', 'red');
      proceed = false;
    }


    //everything looks good! proceed...
    if (proceed) {
      var hash = window._hash;
      hash = hash.replace('#', '');

      //data to be sent to server
      var post_data;
      var output;
      post_data = {
        'user_name': user_name,
        'user_referral': hash,
        'user_email': user_email
      };
      //Ajax post data to server

      $.post('/process_email', post_data, function(response) {
        //load json data from server and output message 

        if (response.status == 0 || response.status == 1) {
          output = '<div class="error">' + response.message + '</div>';
        } else {
          document.querySelector('.user_link').innerHTML = response.url;
          output = '<div class="success">' + response.message + '</div>';
          $('.pixfort_gym_13 #contact_form input').val('');
          $.fancybox("#hidden_pix_13");

        }

        $(".pixfort_gym_13 #result").hide().html(output).slideDown();
      }, 'json');

    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $(".pixfort_gym_13 #contact_form input, .pixfort_gym_13 #contact_form textarea,  select[name=countries]").keyup(function() {
    $(".pixfort_gym_13 #contact_form input, .pixfort_gym_13 #contact_form textarea,  select[name=countries]").css('border-color', '');
    $(".pixfort_gym_13 #result").slideUp();
  });

});