(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    $(document).ready(function() {
        $('#sendBtn').click(function() {
          var email = $('#email').val();
          var message = $('#message').val();
          if(email && message) {
            var subject = encodeURIComponent("Message from OpsTossIT Website");
            var body = encodeURIComponent(message);
            window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
          } else {
            alert('Please enter both email and message.');
          }
        });
      });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

//read more and less
$(document).ready(function () {
    $('.read-more-toggle').on('click', function () {
      const textElement = $(this).siblings('.read-more-text');
      textElement.toggleClass('expanded');

      $(this).text(textElement.hasClass('expanded') ? 'Read less' : 'Read more');
    });
  });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

    


})(jQuery);

