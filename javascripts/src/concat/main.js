;(function($) {
  'use strict';

  var initEditor = function() {
    window.editor = new wysihtml5.Editor(document.querySelector('#textarea'), {
      name: 'demo-editor',
      style: false,
      toolbar: "toolbar",
      parserRules:  wysihtml5ParserRules,
      stylesheets: ['/stylesheets/main.min.css']
    });

    $('[data-behavior="showstyles"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="showstyles"] + .edy-tb-stylemenu').toggle();
      $('body').on('click', styleToolSideClick);
    });

    $('[data-behavior="showfontsizes"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="showfontsizes"] + .edy-tb-stylemenu').toggle();
      $('body').on('click', fontSizeToolSideClick);
    });

    $('[data-behavior="foreColor"]').on('click', function(event) {
      event.stopPropagation();
      $('[data-behavior="foreColor"] + .edy-tb-color-modal').toggle();
      $('body').on('click', colorToolSideClick);
    });

    $('[data-wysihtml5-command="foreColor"]').on('click', function(event) {
      event.stopPropagation();
      var colorValue = $(event.target).data('value');
      if (colorValue) {
        editor.composer.commands.exec("foreColorStyle", colorValue);
        setTimeout(function() {
          setColorToolBackground();
          setColorToolForeground();
      }, 0);
      }
    });

    var dialog = new wysihtml5.toolbar.Dialog(
      document.querySelector("[data-wysihtml5-command='createLink']"),
      document.querySelector("[data-wysihtml5-dialog='createLink']")
    );
    dialog.observe("cancel", function(attributes) {
      console.log("!", attributes);
    });

    $('[data-behavior="createLink"]').on('click', function(event) {
      $('body').on('click', linkToolSideClick);
    });

    $('[data-behavior="showSource"]').on('click', function(event) {
      var HTML = $.trim(editor.getValue());
      $('#source textarea').val(HTML);
      $('#editor, #source').toggle();
    });

    $('#source .editor-source-btns .cancel').on('click', function(event) {
      event.preventDefault();
      $('#editor, #source').toggle();
    });

    $('#source .editor-source-btns .update').on('click', function(event) {
      event.preventDefault();
      var HTML = $('#source textarea').val();
      editor.setValue(HTML);
      $('#editor, #source').toggle();
    });

    var styleToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-behavior="showstyles"] + .edy-tb-stylemenu').contains(event.target))) {
        $('[data-behavior="showstyles"] + .edy-tb-stylemenu').hide(); 
        $('body').off('click', styleToolSideClick);
      }
    };

    var fontSizeToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-behavior="showfontsizes"] + .edy-tb-stylemenu').contains(event.target))) {
        $('[data-behavior="showfontsizes"] + .edy-tb-stylemenu').hide(); 
        $('body').off('click', fontSizeToolSideClick);
      }
    };

    var linkToolSideClick = function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if (!(document.querySelector('[data-wysihtml5-command="createLink"] + .edy-popover').contains(event.target))) {
        $('[data-wysihtml5-command="createLink"] + .edy-popover').hide(); 
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

    var calculateColorLightness = function(rgbString) {
      if (rgbString) {
        var rgb = rgbString.match(/rgb\((\d+,\d+,\d+)\)/)[1].split(',');
        return Math.round(((+rgb[0]) * 0.2126 + (+rgb[1]) * 0.7152 + (+rgb[2]) * 0.0722) / 2.55) / 100;
      } else {
        return 1;
      }
    };

    var setColorToolBackground = function() {
      var foreColorStyle = editor.composer.commands.stateValue('foreColorStyle');
      $('[data-behavior="foreColor"] svg circle').css('fill', foreColorStyle || 'transparent');
    };

    var setColorToolForeground = function() {
      var foreColorStyle = editor.composer.commands.stateValue('foreColorStyle'),
          lightness = calculateColorLightness(foreColorStyle),
          color = (lightness < 0.6) ? 'rgba(255,255,255,.9)' : 'rgba(0,0,0,.9)';

      $('[data-behavior="foreColor"] svg path').eq(0).css('color', color);
    };

    $('#textarea').on('mouseup blur', function(event) {
      editor.selBookmark = editor.composer.selection.getBookmark();
      setTimeout(function() {
        setColorToolBackground();
        setColorToolForeground();
      }, 0);
    });
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

      $('body,html').animate({scrollTop: $target.offset().top + 'px'});
    });

    var latestKnownScrollY,
        startScroll,
        endScroll,
        scrolled,
        ticking = false;

    var getArrowState = function(scrollBottom) {
      return !(
        (document.querySelector('.content-top').getBoundingClientRect().bottom - window.innerHeight > -5 &&
        document.querySelector('.content-top #editor').getBoundingClientRect().bottom - window.innerHeight + 30 < 5) ||
        (document.querySelector('.content-middle').getBoundingClientRect().bottom - window.innerHeight > -5 &&
        document.querySelector('.content-middle .content-formatted').getBoundingClientRect().bottom - window.innerHeight + 30 < 5)
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

    $('body').on('load', setTimeout(function() {
      $('.header').removeClass('top middle bottom').addClass(getHeaderClass());
    }, 0));
  };

  var initCommonPage = function() {
    // Add common page specific functions here.
  };

  // Enables the usage of the initiations outside this file.
  window.site = $.extend(window.site || {}, {
    initFrontPage: initFrontPage,
    initEditor: initEditor,
    initCommonPage: initCommonPage
  });
})(jQuery);
