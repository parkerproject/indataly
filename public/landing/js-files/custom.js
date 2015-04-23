// jQuery Initialization
jQuery(document).ready(function($){
"use strict"; 


        //======================================================================================================
        //      Fancy Box
        //======================================================================================================
        if ($('.lightbox, .button-fullsize, .fullsize').length > 0) {
            $('.lightbox, .button-fullsize, .fullsize').fancybox({
                padding    : 0,
                margin    : 0,
                maxHeight  : '90%',
                maxWidth   : '90%',
                loop       : true,
                fitToView  : false,
                mouseWheel : false,
                autoSize   : false,
                closeClick : false,
                overlay    : { showEarly  : true },
                helpers    : { media : {} }
            });
        }
        //======================================================================================================


         // ----------------- EASING ANCHORS ------------------ //

        $('a[href*=#]').click(function() {

         if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

                 var $target = $(this.hash);

                 $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                 if ($target.length) {

                     var targetOffset = $target.offset().top;

                     $('html,body').animate({scrollTop: targetOffset}, 1000);

                     return false;

                }

           }

       });


        //======================================================================================================
        //      Go To Top
        //======================================================================================================
        $('#gototop').click(function(e){
            jQuery('html, body').animate({scrollTop:0}, 750, 'linear');
            e.preventDefault();
            return false;
        });
        //======================================================================================================
    




        //======================================================================================================
        //      Submit (Gym 13)
        //======================================================================================================
         $("#submit_btn_13").click(function() { 

            //get input field values
            var user_name       = $('.pixfort_gym_13 input[name=name]').val();
            var user_email      = $('.pixfort_gym_13 input[name=email]').val();
            var user_number    = $('.pixfort_gym_13 input[name=number]').val();

            

            //var user_country    = $('.pixfort_gym_13 select[name=countries]').val();
           // var user_message    = $('.pixfort_gym_13 textarea[name=message]').val();
            
            //simple validation at client's end
            //we simply change border color to red if empty field using .css()
            var proceed = true;
            
            if(user_name==""){ 
                $('.pixfort_gym_13 input[name=name]').css('border-color','red'); 
                proceed = false;
            }
            if(user_number==""){ 
                $('.pixfort_gym_13 input[name=number]').css('border-color','red'); 
                proceed = false;
            }
            if(user_email==""){ 
                $('.pixfort_gym_13 input[name=email]').css('border-color','red'); 
                proceed = false;
            }
            
          // $.fancybox("#hidden_pix_13");


            //everything looks good! proceed...
            if(proceed) 
            {

                //data to be sent to server
                var post_data;
                var output;
                post_data = {'user_name':user_name, 'user_number':user_number, 'user_email':user_email };
                //Ajax post data to server
                
                $.post('pix_mail/contact_me_13.php', post_data, function(response){  
                    //load json data from server and output message     
                    if(response.type == 'error')
                    {
                        output = '<div class="error">'+response.text+'</div>';
                    }else{
                        $.fancybox("#hidden_pix_6");
                        output = '<div class="success">'+response.text+'</div>';
                        
                        //reset values in all input fields
                        $('.pixfort_gym_13 #contact_form input').val(''); 
                        $('.pixfort_gym_13 #contact_form textarea').val(''); 
                    }
                    
                    $(".pixfort_gym_13 #result").hide().html(output).slideDown();
                }, 'json');
                
            }
        });
        
        //reset previously set border colors and hide all message on .keyup()
        $(".pixfort_gym_13 #contact_form input, .pixfort_gym_13 #contact_form textarea,  select[name=countries]").keyup(function() { 
            $(".pixfort_gym_13 #contact_form input, .pixfort_gym_13 #contact_form textarea,  select[name=countries]").css('border-color',''); 
            $(".pixfort_gym_13 #result").slideUp();
        });
        //======================================================================================================

        //======================================================================================================
        //  END OF DOCUMENT
        //=================
});