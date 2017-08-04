(function($) {
	var defaults = {
		'stripeType': 'skew',
		'stripeSize': '16px',	
		'stripeSpeed': '60s',
	};
	var initialized = false;

	function init() {
		if (! initialized) {
			initialized = true;
			$('head').append('<style>@keyframes diffpageAnim { 0% {background-position: 0 0;} 100% {background-position: 100% 100%;} }</style>');
		}
	}

	function syncScroll (sender) {
		var t = $(sender.contentWindow).scrollTop();
		$(sender).siblings().each(function() {
			$(this.contentWindow).scrollTop(t);
		});
	}

	function registerScrollSync(iframe) {
		$(iframe.contentWindow).scroll(function() { syncScroll(iframe); });
	}

	function styleCover($cover, type, size, speed) {
		var deg, px, duration;
		switch (type) {
			case 'v':
			case 'vertical':
				deg = '-90deg';
				break;
			case 'h':
			case 'horizontal':
				deg = '0deg';
				break;
			case 'skew':
			default:
				deg = '-45deg';
				break;
		}
		px = size ? size : '16px';
		duration = speed ? speed : '60s';
		$cover.css({
			'mix-blend-mode': 'multiply',
			'background-image': 'linear-gradient(' + deg + ', #fff 25%, #000 25%, #000 50%, #fff 50%, #fff 75%, #000 75%, #000)',
			'background-size': px + ' ' + px,
			'animation': 'diffpageAnim ' + duration + ' linear infinite'
		});
	}

	var methods = {
		'init': function(options) {
			init();
			var opts = $.extend(true, {}, defaults, options);
			return this.each(function() {
				var $this = $(this);
				var $ifOld = $('<iframe class="diffpageOld" />');
				var $ifNew = $('<iframe class="diffpageNew" />');
				var $ifOrg = $('<iframe class="diffpageOrg" />');
				var $cover = $('<div class="diffpageCover" />');
				var ifCss = {
					'position':'absolute',
					'width': '100%',
					'height': '100%',
					'top': '0',
					'left': '0',
					'border': 'none',
				};
				$this.html('');
				$this.css({
					'position' : 'relative',
					'overflow' : 'hidden'
				});
				$ifOld.css($.extend({}, ifCss, {'background-color':'#fff'}));
				$ifNew.css($.extend({}, ifCss, {'background-color':'#fff', 'mix-blend-mode':'difference'}));
				$ifOrg.css($.extend({}, ifCss, {'background-color':'#fff', 'mix-blend-mode':'difference'}));
				$cover.css(ifCss);
				styleCover($cover, opts.stripeType, opts.stripeSize, opts.stripeSpeed);
				$this.append($ifOld);
				$this.append($ifNew);
				$this.append($cover);
				$this.append($ifOrg);
				$this.children('iframe').on('load', function() {
					registerScrollSync(this);
				});
				$ifOld.attr('src', opts.oldUrl);
				$ifNew.attr('src', opts.newUrl);
				$ifOrg.attr('src', opts.newUrl);
			});
		},
		'mode': function(mode) {
			return this.each(function() {
				var $this = $(this);
				var $ifOld = $this.children('.diffpageOld');
				var $ifNew = $this.children('.diffpageNew');
				var $ifOrg = $this.children('.diffpageOrg');
				var $cover = $this.children('.diffpageCover');
				switch (mode) {
					case 'old':
						$ifOld.show();
						$ifNew.hide();
						$cover.hide();
						$ifOrg.hide();
						break;		
					case 'new':
						$ifOld.hide();
						$ifNew.show();
						$cover.hide();
						$ifOrg.hide();
						break;		
					case 'diff':
						$ifOld.show();
						$ifNew.show();
						$cover.hide();
						$ifOrg.hide();
						break;		
					default:
						$ifOld.show();
						$ifNew.show();
						$cover.show();
						$ifOrg.show();
						break;		
				}
			});
		}	
	};
	
	$.fn.diffpage = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('jQuery.diffpage: Method does not exists');
		}
	};
})(jQuery);
