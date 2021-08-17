/***********************************************
 * WIDGET: COUNTER UP
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.counterUp = {
		init: function () {
			// check if plugin defined
			if (typeof $.fn.numerator == 'undefined') {
				return;
			}
			var el = $('.vlt-counter-up, .vlt-counter-up-small');

			el.each(function () {
				var $this = $(this),
					animation_duration = $this.data('animation-speed') || 1000,
					ending_number = $this.data('ending-number') || 0,
					delimiter = $this.data('delimiter') || false;
				VLTJS.window.on('vlt.change-slide', function () {
					if ($this.parents('.vlt-section').hasClass('active')) {
						var counter_el = $this.find('.counter').html('0');
						setTimeout(function () {
							counter_el.numerator({
								easing: 'linear',
								duration: animation_duration,
								delimiter: delimiter,
								toValue: ending_number,
							});
						}, 500);
					}
				});
			});

		}
	}
	VLTJS.counterUp.init();

})(jQuery);