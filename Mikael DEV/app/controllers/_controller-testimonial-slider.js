/***********************************************
 * WIDGET: TESTIMONIAL SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.testimonialSlider = {
		init: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-testimonial-slider .swiper-container');
			el.each(function () {
				var $this = $(this);
				$this.find('.swiper-wrapper > *').wrap('<div class="swiper-slide">');
				new Swiper(this, {
					speed: 1000,
					spaceBetween: 30,
					grabCursor: true,
					effect: 'coverflow',
					slidesPerView: 1,
					navigation: {
						nextEl: $('.vlt-testimonial-slider-controls .next'),
						prevEl: $('.vlt-testimonial-slider-controls .prev'),
					},
					pagination: {
						el: $('.vlt-testimonial-slider-controls .pagination'),
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

	VLTJS.testimonialSlider.init()

})(jQuery);