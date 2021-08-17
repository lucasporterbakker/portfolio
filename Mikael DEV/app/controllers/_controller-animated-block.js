/***********************************************
 * WIDGET: ANIMATED BLOCK
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.animatedBlock = {
		init: function () {
			var el = $('.vlt-animated-block');
			el.each(function () {
				var $this = $(this);
				VLTJS.window.on('vlt.change-slide', function () {
					$this.removeClass('animated');
					if ($this.parents('.vlt-section').hasClass('active')) {
						$this.addClass('animated');
					}
				});
			});
		}
	}
	VLTJS.animatedBlock.init();

})(jQuery);