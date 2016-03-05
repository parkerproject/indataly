// for Smooth scroll

$("nav ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 600, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});


new WOW().init();
/*Preloader*/
//<![CDATA[
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({'overflow':'visible'});
})
//]]>
$(document).ready(function() {  
        $("html").niceScroll({cursorcolor:"#3f8cca"});
		$('.tabbing ul li:first-child').hover(function(){
			$(this).toggleClass('active');
			$('.tabbing ul li:last-child').toggleClass('active');
		});
    });

