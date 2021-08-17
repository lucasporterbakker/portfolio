/***********************************************
 * SITE: CUSTOM CURSOR
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.customCursor = {
		init: function () {
			if (!$('.vlt-is--custom-cursor').length) {
				return;
			}
			VLTJS.body.append('<div class="vlt-custom-cursor"><div class="circle"><span></span></div></div>');
			var cursor = $('.vlt-custom-cursor'),
				circle = cursor.find('.circle'),
				startPosition = {
					x: 0,
					y: 0
				},
				endPosition = {
					x: 0,
					y: 0
				},
				delta = .25;
			if (typeof gsap != 'undefined') {
				gsap.set(circle, {
					xPercent: -50,
					yPercent: -50
				});
				VLTJS.document.on('mousemove', function (e) {
					var offsetTop = window.pageYOffset || document.documentElement.scrollTop;
					startPosition.x = e.pageX;
					startPosition.y = e.pageY - offsetTop;
				});
				gsap.ticker.add(function () {
					endPosition.x += (startPosition.x - endPosition.x) * delta;
					endPosition.y += (startPosition.y - endPosition.y) * delta;
					gsap.set(circle, {
						x: endPosition.x,
						y: endPosition.y
					})
				});
				VLTJS.document.on('mousedown', function () {
					gsap.to(circle, .3, {
						scale: .7
					});
				}).on('mouseup', function () {
					gsap.to(circle, .3, {
						scale: 1
					});
				});
				VLTJS.document.on('mouseenter', 'input, textarea, select, .vlt-video-button > a', function () {
					gsap.to(circle, .3, {
						scale: 0,
						opacity: 0
					});
				}).on('mouseleave', 'input, textarea, select, .vlt-video-button > a', function () {
					gsap.to(circle, .3, {
						scale: 1,
						opacity: .1
					});
				});
				VLTJS.document.on('mouseenter', 'a, button, [role="button"]', function () {
					gsap.to(circle, .3, {
						height: 60,
						width: 60,
					});
				}).on('mouseleave blur', 'a, button, [role="button"]', function () {
					gsap.to(circle, .3, {
						height: 15,
						width: 15,
					});
				});
				VLTJS.document.on('mouseenter', '[data-cursor]', function () {
					var $this = $(this);
					gsap.to(circle, .3, {
						height: 80,
						width: 80,
						opacity: 1,
						onStart: function () {
							circle.find('span').html($this.attr('data-cursor'));
						}
					});
				}).on('mouseleave', '[data-cursor]', function () {
					gsap.to(circle, .3, {
						height: 15,
						width: 15,
						opacity: .1,
						onStart: function () {
							circle.find('span').html('');
						}
					});
				});
			}
		}
	};
	if (!VLTJS.isMobile.any()) {
		VLTJS.customCursor.init();
	}
})(jQuery);