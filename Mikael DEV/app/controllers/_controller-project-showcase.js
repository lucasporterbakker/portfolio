/***********************************************
 * WIDGET: PROJECT SHOWCASE
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.projectShowcase = {
		initSlider: function () {
			// check if plugin defined
			if (typeof Swiper == 'undefined') {
				return;
			}
			var el = $('.vlt-project-showcase-slider .swiper-container');
			new Swiper(el, {
				speed: 1000,
				spaceBetween: 30,
				grabCursor: true,
				slidesPerView: 1,
				breakpoints: {
					575: {
						slidesPerView: 2,
					},
				},
			});
		},
		initParallax: function () {
			// check if plugin defined
			if (typeof gsap == 'undefined') {
				return;
			}
			var el = $('.vlt-project-showcase'),
				items = el.find('.vlt-project-showcase__items'),
				item = items.find('.vlt-project-showcase__item'),
				images = el.find('.vlt-project-showcase__images'),
				image = images.find('.vlt-project-showcase__image'),
				wDiff,
				value;

			var sliderWidth = el.outerWidth(true),
				sliderImageWidth = images.outerWidth(true),
				itemsWidth = items.outerWidth(),
				sliderImageDiff = (sliderWidth - sliderImageWidth) / sliderWidth;

			wDiff = (itemsWidth / sliderWidth) - 1;
			wDiff = (sliderWidth - itemsWidth) / sliderWidth;

			item.on('mouseenter', function () {
				item.removeClass('is-active');
				image.removeClass('is-active');
				$(this).addClass('is-active');
				image.eq($(this).index()).addClass('is-active');
			});

			item.eq(0).trigger('mouseenter');

			VLTJS.window.on('mousemove', function (e) {
				value = e.pageX - el.offset().left;
			});

			gsap.ticker.add(function () {
				gsap.set(items, {
					x: value * wDiff,
					ease: 'power3.out'
				});
				gsap.set(images, {
					right: value * sliderImageDiff,
					ease: 'power3.out'
				});
			});

		}
	}
	VLTJS.projectShowcase.initSlider();
	VLTJS.projectShowcase.initParallax();
	VLTJS.debounceResize(function () {
		VLTJS.projectShowcase.initParallax();
	});
})(jQuery);