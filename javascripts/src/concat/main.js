;(function($) {
  'use strict';
  // FUNCTIONS INITIATIONS
  var initFrontPage = function() {
    // Add front page layout specific functions here.

    $('.scroller-arrow').on('click', function(event) {
      var getCurrentBox = function() {
        if ($(window).scrollTop() <= $('.content-top').offset().top + $('.content-top').height()) {
          return 'top';
        } else if ($(window).scrollTop() <= $('.content-middle').offset().top + $('.content-middle').height()) {
          return 'middle';
        } else {
          return 'bottom';
        }
      },  
          $arrow = $(event.target),
          $parent = $('.content-' + getCurrentBox()),
          $target = $parent.next('.content-box');

      $('body').animate({scrollTop: $target.offset().top + 'px'});
    });

    var latestKnownScrollY,
        startScroll,
        endScroll,
        scrolled,
        ticking = false;

    var handler = function() {
      if (!startScroll) {
        startScroll = $(window).scrollTop();
      } else {
        endScroll = $(window).scrollTop();
        scrolled = endScroll - startScroll;

        var scrollBottom = endScroll + $(window).innerHeight();

        var getArrowState = function() {
          return !(scrollBottom - 20 <= $('.content-top').offset().top + $('.content-top').height() || (scrollBottom - 20 >= $('.content-middle .content-formatted').offset().top + $('.content-middle .content-formatted').height() && scrollBottom - 20 < $('.content-bottom').offset().top));
        };

        if (getArrowState()) {
          $('.scroller-arrow').fadeOut(300);
        } else {
          $('.scroller-arrow').fadeIn(300);
        }  

      }
    };

    var update = function() {
      ticking = false;
      handler();
    };

    var requestTick = function() {
      if (!ticking) { requestAnimationFrame(update); }
      ticking = true;
    };
    
    var onScroll = function() {
      latestKnownScrollY = window.scrollY;
      requestTick();
    };

    $(window).on('scroll', onScroll);
  };

  var initCommonPage = function() {
    // Add common page specific functions here.
  };

  var init = function() {
    // Add site wide functions here.
  };

  // Enables the usage of the initiations outside this file.
  window.site = $.extend(window.site || {}, {
    initFrontPage: initFrontPage,
    initCommonPage: initCommonPage
  });

  // Initiates site wide functions.
  init();
})(jQuery);
