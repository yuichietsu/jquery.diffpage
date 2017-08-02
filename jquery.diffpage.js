(function($) {
	var defaults = {
		'control':true
	};
	var initialized = false;

	function init() {
		if (! initialized) {
			initialized = true;
			$('head').append('<style> .diffpageCover { mix-blend-mode: multiply; background-image: linear-gradient( -45deg, #fff 12.5%, #000 12.5%, #000 25%, #f00 25%, #f00 37.5%, #000 37.5%, #000 50%, #fff 50%, #fff 62.5%, #000 62.5%, #000 75%, #f00 75%, #f00 87.5%, #000 87.5%, #000); background-size: 16px 16px; animation: diffpageAnim 60s linear infinite; } @keyframes diffpageAnim { 0% {background-position: 0 0;} 100% {background-position: 100% 100%;} } </style>');
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
	
	$.fn.diffpage = function(options) {
		init();
		var opts = $.extend(true, {}, defaults, options);
		return this.each(function() {
			var $this = $(this);
			var $ifOld = $('<iframe />');
			var $ifNew = $('<iframe />');
			var $ifOrg = $('<iframe />');
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
	};
})(jQuery);
