
$(function() {
  $.fn.typeahead.Constructor.prototype.render = function (items) {
    var that = this
    items = $(items).map(function (i, item) {
      i = $(that.options.item).attr('data-value', item)
      // Prepare the link
      var link = item.replace(/\s/g, '-').toLowerCase()
      // Replace all characters that are not A-Z, 0-9, -, _, \s
      link = link.replace(/[^A-Za-z0-9_-\s]+/g, '')
      i.find('a').attr('href', '#' + link).html(that.highlighter(item))
      return i[0]
    })
    items.first().addClass('active')
    this.$menu.html(items)
    return this
  }
})

$(function() {

  var $readmeDocs = $('#readme-docs')

  // Remove the first h2 since it's an index
  $readmeDocs.find('h2').first().remove()
  $readmeDocs.find('ul').first().remove()

  // Replace all header tags with anchor tags
  $readmeDocs.find('h1, h2, h3, h4, h5, h6').each(function(i, el) {
    // Remove <sup> from text
    var $sup = $(this).find('sup')
    if ($sup.length !== 0)
      $(this).find('sup').remove()
    var text = $(this).text().trim()
    // Prepare the link
    var link = text.replace(/\s/g, '-').toLowerCase()
    // Replace all characters that are not A-Z, 0-9, -, _, \s
    link = link.replace(/[^A-Za-z0-9_-\s]+/g, '')
    $(this).html('<a href="#' + link + '" name="' + link + '" id="' + link + '">' + text + '</a>' + (($sup.length !== 0) ? ' ' + $.html($sup) : '' ) )
    $(this).before('<hr />')
  })

  // Add prettyprint and linenums all <pre>'s
  $readmeDocs.find('pre').addClass('prettyprint linenums')

  // Add .table, .table-striped, .table-hover to all <table>'s
  $readmeDocs.find('table').addClass('table table-striped table-hover')

})

$(document).ready(function(){
	var hashTag = window.location.href;
	if (hashTag.indexOf('#') > 0){
		hashTag = hashTag.substr(hashTag.indexOf('#'));
		$('html, body').animate({scrollTop: $(hashTag).offset().top-60}, 1);
	}
});

$(function() {

  // make code pretty
  /*globals prettyPrint*/
  if (window.prettyPrint)
    prettyPrint()

  // grab all h2's and make them into JSON search
  var search = []
  var $h2 = $('h2')
  for(var i=0; i<$h2.length; i++) {
    var text = $($h2[i]).find('a').text()
    search.push(text)
  }


  var $search = $('<input type="text" placeholder="search docs..." /><i class="icon-search"></i>')
  var $form = $('<form class="navbar-form pull-right"></form>')
  $form.append($search)
  $form.insertAfter('a.brand')
  $search.typeahead({
    source: search,
    updater: function(item) {
      // Prepare the link
      var link = item.replace(/\s/g, '-').toLowerCase()
      // Replace all characters that are not A-Z, 0-9, -, _, \s
      link = link.replace(/[^A-Za-z0-9_-\s]+/g, '')
      window.location.hash = '#' + link
      return item
    }
  })

})

// hash function
$('a').click(function(ev) {
	
  if (this.toString().indexOf("github.com") == -1){
		ev.preventDefault();
	} else {
		$(this).attr('target','_blank');
	}

  var target = this.hash;

	if (target.toString().indexOf('#ruby') ==-1 &&
			target.toString().indexOf('#python') ==-1 &&
			target.toString().indexOf('#php') ==-1 &&
			target.toString().indexOf('#node') ==-1 &&
			target.toString().indexOf('#response') ==-1 ){
		if (this.href !== '#') {
			$('html, body').animate({
				scrollTop: $(target).offset().top - 80
			}, 1000);
		}

		if ($(document).width()< 768 && this.href !== '#') {
			$('html, body').animate({
				scrollTop: $(target).offset().top - 0
			}, 1000);
		}
	}

});

$(function() {
  $('#myTab a:last').tab('show');
})