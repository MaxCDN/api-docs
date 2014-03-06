$(function() {
    $.fn.typeahead.Constructor.prototype.render = function (items) {
        var that = this;
        items = $(items).map(function (i, item) {
            i = $(that.options.item).attr('data-value', item);
            // Prepare the link
            var link = item.replace(/\s/g, '-').toLowerCase();
            // Replace all characters that are not A-Z, 0-9, -, _, \s
            link = link.replace(/[^A-Za-z0-9_-\s]+/g, '');
            i.find('a').attr('href', '#' + link).html(that.highlighter(item));
            return i[0];
        });
        items.first().addClass('active');
        this.$menu.html(items);
        return this
    }
});

$(function() {
    var $readmeDocs = $('#readme-docs');

    // Remove the first h2 since it's an index
    $readmeDocs.find('h2').first().remove();
    $readmeDocs.find('ul').first().remove();

    // Replace all header tags with anchor tags
    $readmeDocs.find('h1, h2, h3, h4, h5, h6').each(function(i, el) {
        // Remove <sup> from text
        var $sup = $(this).find('sup');
        if ($sup.length !== 0) {
            $(this).find('sup').remove();
        }
        var text = $(this).text().trim();
        // Prepare the link
        var link = text.replace(/\s/g, '-').toLowerCase();
        // Replace all characters that are not A-Z, 0-9, -, _, \s
        link = link.replace(/[^A-Za-z0-9_-\s]+/g, '');
        $(this).html('<a href="#' + link + '" name="' + link + '" id="' + link + '">' + text + '</a>' + (($sup.length !== 0) ? ' ' + $.html($sup) : '' ) );
        $(this).before('<hr />');
    });

    // Add prettyprint and linenums all <pre>'s
    $readmeDocs.find('pre').addClass('prettyprint linenums');

    // Add .table, .table-striped, .table-hover to all <table>'s
    $readmeDocs.find('table').addClass('table table-striped table-hover');
});

$(document).ready(function(){
    var hashTag = window.location.href;
    if (hashTag.indexOf('#') > 0){
        hashTag = hashTag.substr(hashTag.indexOf('#'));
        hashTag = hashTag;
        console.dir(hashTag);
        $('html, body').animate({scrollTop: $(hashTag).offset().top-60}, 1);
    }
});

$(function() {
    // make code pretty
    /*globals prettyPrint*/
    if (window.prettyPrint) {
        prettyPrint();
    }

    // grab all h2's and make them into JSON search
    var search = [];
    var $h2 = $('h2');
    for(var i=0; i<$h2.length; i++) {
        var text = $($h2[i]).find('a').text();
        search.push(text);
    }

    var $search = $('<input type="text" placeholder="search docs..." /><i class="icon-search"></i>');
    var $form = $('<form class="navbar-form pull-right"></form>');
    $form.append($search);
    $form.insertAfter('a.brand');
    $search.typeahead({
        source: search,
        updater: function(item) {
            // Prepare the link
            var link = item.replace(/\s/g, '-').toLowerCase();
            // Replace all characters that are not A-Z, 0-9, -, _, \s
            link = link.replace(/[^A-Za-z0-9_-\s]+/g, '');
            window.location.hash = '#' + link;
            return item;
        }
    });
});

// hash function
$('a').click(function(ev) {
    if ($(this).attr("href").charAt(0) === "#" ) {
        ev.preventDefault();

        var animateSpeed = 500;
        var target = this.hash;

        if (target.toString().indexOf('#ruby') ==-1 &&
                target.toString().indexOf('#python') ==-1 &&
                target.toString().indexOf('#php') ==-1 &&
                target.toString().indexOf('#node') ==-1 &&
                target.toString().indexOf('#response') ==-1 ) {
            if (this.href !== '#') {
                $('html, body').animate({
                  scrollTop: $(target).offset().top - 80
                }, animateSpeed);
            }

            if ($(document).width()< 768 && this.href !== '#') {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 0
                }, animateSpeed);
            }
        }
    } else {
        $(this).attr('target','_blank');
    }
});

$(function() {
    $('#myTab a:last').tab('show');
});

//
// This is to override the Scrollspy to enable a second dropdown
//
!function ($) {
  "use strict"; // jshint ;_;

 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }
        //This enables the extra dropdown index on the side nav bar
        if (active.parent('.nav-down').length)  {
          $('.nav-down').each(function(idx, dropdown) {
            $(dropdown).addClass('hide')
          })
          active.parent('.nav-down').removeClass('hide')
          active.parent('.nav-down').prev().addClass('active')
        }
        else {
          $('.nav-down').each(function(idx, dropdown) {
            $(dropdown).addClass('hide')
          })

          if (active.next('.nav-down').length)  {
            active.next('.nav-down').removeClass('hide')
          }
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);
