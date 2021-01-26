/*========== CLOSE MOBILE MENU ON CLICK & SMOOTH SCROLL TO LINK a[href^="#"] ==========*/
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('.navbar-toggler').addClass('collapsed');
  $('#navbarResponsive').removeClass('show');

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 1000);
});

/*========== MULTI-LEVEL / DOUBLE CLICK DROP DOWN MENU ==========*/
$(document).ready(function () {
    var DELAY = 700, clicks = 0, timer = null;

    // On click or double click
    $("nav ul li.dropdown a.dropdown-toggle")
        .on("click", function (e) {
            clicks++;
            if (clicks === 1) {
                timer = setTimeout(function () {
                    clicks = 0;
                }, DELAY);
            } else {
                clearTimeout(timer);
                window.location.href = $(this).attr('href');
                clicks = 0;
            }
        })
        .on("dblclick", function (e) {
            e.preventDefault();
        });

    //mulit-level menu
    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).siblings().toggleClass("show");


        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

    });
});


/*========== MAKE ALL ANIMATION "FADEINUP" ON MOBILE ==========*/
$(document).ready(function () { //when document(DOM) loads completely
    if ($(window).width() < 768) { //if the window is less than 768px
        $("div").attr('data-animation', 'animate__animated animate__fadeInUp'); //any div with the "data-animation" attribute should have it's value (animation style) changed to "fadeInUp"
        $("div").attr('data-delay', '0s'); //remove data delay
    }
});


/*========== WAYPOINTS ANIMATION DELAY ==========*/
$(function () { // a self calling function
    function onScrollInit(items, trigger) { // a custom made function
       items.each(function () { //for every element in items run function
          var osElement = $(this), //set osElement to the current
             osAnimationClass = osElement.attr('data-animation'), //get value of attribute data-animation type
             osAnimationDelay = osElement.attr('data-delay'); //get value of attribute data-delay time
 
          osElement.css({ //change css of element
             '-webkit-animation-delay': osAnimationDelay, //for safari browsers
             '-moz-animation-delay': osAnimationDelay, //for mozilla browsers
             'animation-delay': osAnimationDelay //normal
          });
 
          var osTrigger = (trigger) ? trigger : osElement; //if trigger is present, set it to osTrigger. Else set osElement to osTrigger
 
          osTrigger.waypoint(function () { //scroll upwards and downwards
             osElement.addClass('animated').addClass(osAnimationClass); //add animated and the data-animation class to the element.
          }, {
                triggerOnce: true, //only once this animation should happen
                offset: '70%' // animation should happen when the element is 70% below from the top of the browser window
             });
       });
    }
 
    // onScrollInitCounterUp();
    onScrollInit($('.os-animation')); //function call with only items
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container')); //function call with items and trigger
});


/*========== TOP SCROLL BUTTON ==========*/
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.top-scroll').fadeIn();
        } else {
            $('.top-scroll').fadeOut();
        }
    });
});


/*========== CONTACT FORM INPUT VALIDATION ==========*/

$(function () {

  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  $('#contact-form').validator();


  // when the form is submitted
  $('#contact-form').on('submit', function (e) {

      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
          var url = "contact/contact.php"; //Location of form (apply change if moved).

          // POST values in the background the the script URL
          $.ajax({
              type: "POST",
              url: url,
              data: $(this).serialize(),
              success: function (data)
              {
                  // data = JSON object that contact.php returns

                  // we recieve the type of the message: success x danger and apply it to the 
                  var messageAlert = 'alert-' + data.type;
                  var messageText = data.message;

                  // let's compose Bootstrap alert box HTML
                  var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                  
                  // If we have messageAlert and messageText
                  if (messageAlert && messageText) {
                      // inject the alert to .messages div in our form
                      $('#contact-form').find('.messages').html(alertBox);
                      // empty the form
                      $('#contact-form')[0].reset();
                  }
              }
          });
          return false;
      }
  })
});