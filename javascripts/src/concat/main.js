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

    var contentTopBottom = $('.content-top').offset().top + $('.content-top').height();
    var contentMiddleFooter = [
      $('.content-middle .content-formatted').offset().top + $('.content-middle .content-formatted').height(),
      $('.content-bottom').offset().top
    ];

    var getArrowState = function(scrollBottom) {
      return !(
        scrollBottom - 20 <= contentTopBottom ||
        (scrollBottom - 20 >= contentMiddleFooter[0] && scrollBottom - 20 < contentMiddleFooter[1])
      );
    };

    var handler = function() {
      if (!startScroll) {
        startScroll = $(window).scrollTop();
      } else {
        endScroll = $(window).scrollTop();
        scrolled = endScroll - startScroll;

        var scrollBottom = endScroll + $(window).innerHeight();

        if (getArrowState(scrollBottom)) {
          $('.scroller-arrow').fadeOut(300);
        } else {
          $('.scroller-arrow').fadeIn(300);
        }
        startScroll = 0;
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
