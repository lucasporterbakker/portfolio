/***********************************************
 * WIDGET: TIMELINE SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.timelineSlider = {
		init: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-timeline-slider .swiper-container');
			el.each(function () {
				var $this = $(this);
				$this.find('.swiper-wrapper > *').wrap('<div class="swiper-slide">');
				new Swiper(this, {
					speed: 1000,
					spaceBetween: 0,
					grabCursor: true,
					slidesPerView: 1,
					navigation: {
						nextEl: $('.vlt-timeline-slider-controls .next'),
						prevEl: $('.vlt-timeline-slider-controls .prev'),
					},
					pagination: {
						el: $('.vlt-timeline-slider-controls .pagination'),
						clickable: false,
						type: 'fraction',
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
								'<span class="sep">/</span>' +
								'<span class="' + totalClass + '"></span>';
						}
					}
				});
			});

		}
	};

	VLTJS.timelineSlider.init()

})(jQuery);