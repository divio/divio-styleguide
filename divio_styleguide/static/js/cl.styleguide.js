/*!
 * @author:	Divio AG
 * @copyright:	http://www.divio.ch
 */

//######################################################################################################################
// #NAMESPACES#
var Cl = window.Cl || {};

//######################################################################################################################
// #JQUERY EXTENSION#
Cl.Styleguide = new Class({

	initialize: function () {
		this.styleguide = $('.styleguide');

		// handles all navigational needs
		this.navigation();
		this.hint();
		// section typography
		this.typography();
		this.grid();
		this.forms();
	},

	navigation: function () {
		var sections = $('section');
			sections.hide();

		var nav = $('.styleguide-nav');
		var triggers = nav.find('li a');
			triggers.on('click', function (e) {
				e.preventDefault();
				// show element
				show($(this));
			});

		// helper function to display the correct content
		function show(el) {
			var hash = el.attr('href');

			// reset
			sections.hide();
			nav.find('li').removeClass('active');

			// show
			el.parent().addClass('active');

			var section = $(hash);
				section.show();

			if(window.history && window.history.pushState) {
				if(hash === '#page-index') hash = '#';
				window.history.pushState('Styleguide', 'Category', hash);
			}

			// update grid
			$(window).trigger('resize.grid');
		}

		// initial loading
		var init = nav.find('a[href="'+window.location.hash+'"]');
		if(!init.length) {
			var initSubnav = $('.styleguide a[href="'+window.location.hash+'"]').closest('.styleguide-section').attr('id');
			// lets check if its a subnav
			init = $('a[href="#'+initSubnav+'"]');
		}
		if(!init.length) init = triggers.eq(0);
		init.trigger('click');
	},

	hint: function () {
		var styleguide = $('.styleguide');
		var hint = $('.styleguide-hint:visible');
		if(!hint.length) hint = $('.styleguide-hint').eq(0);
		var pos = hint.offset().top;
		var offset = 10;

		$(window).on('scroll', function () {
			// cancel in ie8 and below
			if(!document.createElement('canvas').getContext) return false;

			hint = $('.styleguide-hint:visible');

			if(pos - $(window).scrollTop() < offset) {
				if($('.styleguide-body:visible').outerHeight(true) - ($(window).scrollTop() + pos - 60) >= 0) {
					hint.css('top', ($(window).scrollTop() - pos + offset));
				}
			} else {
				hint.css('top', 0);
			}
		});

		// handle code view
		var buttons = $('.btn-codeview');
			buttons.on('click', function (e) {
				e.preventDefault();
				if($(this).hasClass('btn-disabled')) {
					buttons.removeClass('btn-disabled').text('disable code view');
					styleguide.find('.code').show();
				} else {
					buttons.addClass('btn-disabled').text('enable code view');
					styleguide.find('.code').hide();
				}
			});
	},

	typography: function () {
		var container = $('#page-typography');

		// font type replacements
		container.find('.js-fonts').each(function (index, item) {
			item = $(item);
			var target = item.next();
			var text = item.html();
			item.html(text.replace('{tpl}', target.css('font-family').split(',')[0]));
		});

		// add htag tpl replacement
		container.find('h1, h2, h3, h4, h5, h6').each(function (index, item) {
			item = $(item);
			var text = item.html();
			item.html(text.replace('{tpl}', item.css('font-family').split(',')[0] + ' <span class="highlight">' + item.css('font-size') + '/' + item.css('line-height') + '</span>'));
		});

		// add color replacement
		container.find('.autocolor').each(function (index, item) {
			var color = $(item).text();
			if(color === '#') color = rgb2hex($(item).css('color'));
			$(item).css('background', color).css('color', 'white').text(color);
		});

		// function to convert hex format to a rgb color
		function rgb2hex(rgb) {
			code = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			// cancel if null
			if(code === null) return rgb;
			// helpers
			function hex(x) {
				return ('0' + parseInt(x).toString(16)).slice(-2);
			}
			return '#' + hex(code[1]) + hex(code[2]) + hex(code[3]);
		}

	},

	grid: function () {
		var grid = $('#page-grid');
		var containers = grid.find('.grid-template .column > span');
		var triggers = grid.find('.grid-block');
			triggers.bind('click', function () {
				triggers.removeClass('grid-block-active');
				$(this).addClass('grid-block-active');

				$('.grid-template').hide().eq(triggers.index(this)).fadeIn(300);
				$(window).trigger('resize.grid');
			});
		$(window).on('resize.grid', function () {
			containers.each(function () {
				$(this).text($(this).parent().width());
			});
		});

		// activate first grid
		triggers.eq(0).trigger('click');

		// adds control for grid
		grid.find('.btn-fullview, .btn-fullview-revert').on('click', function (e) {
			e.preventDefault();
			grid.toggleClass('styleguide-section-flat');
			grid.find('.styleguide-hint').toggle();
			grid.find('.btn-fullview-revert').parent().toggle();
			$(window).trigger('resize.grid');
		});
	},

	forms: function() {
		var container = $('#page-forms');
		container.find('.btn').bind('click', function(e) {
			e.preventDefault();
		});
	}

});