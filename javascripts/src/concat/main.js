;(function($) {
  'use strict';

  var initEditor = function() {
    $('[data-behavior="showstyles"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="showstyles"] + .edy-tb-stylemenu').toggle();
      $('body').on('click', styleToolSideClick);
    });
    $('[data-behavior="foreColor"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="foreColor"] + .edy-tb-color-modal').toggle();
      $('body').on('click', colorToolSideClick);
    });
    $('[data-behavior="createlink"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="createlink"] + .edy-popover').toggle();
      $('body').on('click', linkToolSideClick);
    });

    var styleToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-behavior="showstyles"] + .edy-tb-stylemenu').contains(event.target))) {
        $('[data-behavior="showstyles"] + .edy-tb-stylemenu').hide(); 
        $('body').off('click', styleToolSideClick);
      }
    };

    var linkToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-behavior="createlink"] + .edy-popover').contains(event.target))) {
        $('[data-behavior="createlink"] + .edy-popover').hide(); 
        $('body').off('click', linkToolSideClick);
      }
    };

    var colorToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-behavior="foreColor"] + .edy-tb-color-modal').contains(event.target))) {
        $('[data-behavior="foreColor"] + .edy-tb-color-modal').hide(); 
        $('body').off('click', colorToolSideClick);
      }
    };

    var fontSizeCmd = function fontSizeCmd(event) {
      var options = $(event.target).closest('.edy-tb-size-btn').data('wysihtml5-command-value');
      var fontSize;
      if (restoreSelection()) {
        if (options === '+' || options === '-') {
          fontSize = Math.round(getSelectionFontSize()) + ((options === '-') ? -1 : 1);
          editor.composer.commands.exec('fontSizeStyle', fontSize + 'px');
        } else {
          fontSize = parseFloat(options);
          if (getSelectionFontSize() !== fontSize) {
            editor.composer.commands.exec('fontSizeStyle', fontSize + 'px');
          }
        }
      }
    };

    var getSelectionFontSize = function() {
      var size = editor.composer.commands.stateValue('fontSizeStyle');

      if (!size) {
        var selectionNode = getSelectionNode();
        size = (selectionNode) ? $(selectionNode).css('font-size') : null;
      }

      if (size) {
        return parseFloat(size);
      }

      return null;
    };

    var getSelectionNode = function() {
      var selectionAncestorNode = editor.composer.selection.getSelectedNode();
      if (selectionAncestorNode && selectionAncestorNode.nodeType !== 1) {
        selectionAncestorNode = selectionAncestorNode.parentNode;
      }
      return selectionAncestorNode;
    };

    var restoreSelection = function(event) {
      if (editor.selBookmark) {
        editor.composer.selection.setBookmark(editor.selBookmark);
        return true;
      }
      return false;
    };

    $('#textarea').on('mouseup blur', function(event) {
      editor.selBookmark = editor.composer.selection.getBookmark();
    });

    $('#toolbar').on('mouseup', '.edy-tb-size-btn', fontSizeCmd);
  };

  var initFrontPage = function() {
    // Add front page layout specific functions here.
    var getCurrentBox = function() {
      if (document.querySelector('.content-top').getBoundingClientRect().bottom - window.innerHeight > -20) {
        return 'top';
      } else if (document.querySelector('.content-middle').getBoundingClientRect().bottom - window.innerHeight > -20) {
        return 'middle';
      } else {
        return 'bottom';
      }
    };

    $('.scroller-arrow').on('click', function(event) {
      event.preventDefault();
      var $parent = $('.content-' + getCurrentBox()),
          $target = $parent.next('.content-box');

      $('body').animate({scrollTop: $target.offset().top + 'px'});
    });

    var latestKnownScrollY,
        startScroll,
        endScroll,
        scrolled,
        ticking = false;

    var getArrowState = function(scrollBottom) {
      return !(
        (document.querySelector('.content-top').getBoundingClientRect().bottom - window.innerHeight > 0 &&
        document.querySelector('.content-top #editor').getBoundingClientRect().bottom - window.innerHeight + 30 < 0) ||
        (document.querySelector('.content-middle').getBoundingClientRect().bottom - window.innerHeight > 0 &&
        document.querySelector('.content-middle .content-formatted').getBoundingClientRect().bottom - window.innerHeight + 30 < 0)
      );
    };

    var getHeaderClass = function() {
      if (document.querySelector('.content-bottom').getBoundingClientRect().top - $('.header').height()/2 > 0) {
        if (document.querySelector('.content-middle').getBoundingClientRect().top - $('.header').height()/2 > 0) {
          return 'top';
        } else {
          return 'middle';
        }
      } else {
        return 'bottom';
      }
    }

    var handler = function() {
      if (!startScroll) {
        startScroll = window.scrollY;
      } else {
        endScroll = window.scrollY;
        scrolled = endScroll - startScroll;

        var scrollBottom = endScroll + $(window).innerHeight();

        if (getArrowState(scrollBottom)) {
          $('.scroller-arrow').fadeOut(300);
        } else {
          $('.scroller-arrow').fadeIn(300);
        }

        $('.header').removeClass('top middle bottom').addClass(getHeaderClass());
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

    initEditor();
  };

  var initCommonPage = function() {
    // Add common page specific functions here.
  };

  // Enables the usage of the initiations outside this file.
  window.site = $.extend(window.site || {}, {
    initFrontPage: initFrontPage,
    initCommonPage: initCommonPage
  });
})(jQuery);
