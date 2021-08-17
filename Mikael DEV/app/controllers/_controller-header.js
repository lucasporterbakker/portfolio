/***********************************************
 * MENU OFFCANVAS
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	VLTJS.menuOffcanvas = {
		config: {
			easing: 'power2.out'
		},
		init: function () {
			var menu = $('.vlt-offcanvas-menu'),
				navigation = menu.find('ul.sf-menu'),
				navigationItem = navigation.find('> li'),
				header = $('.vlt-offcanvas-menu__header'),
				footer = $('.vlt-offcanvas-menu__footer > div'),
				menuOpen = $('.js-offcanvas-menu-open'),
				menuClose = $('.js-offcanvas-menu-close'),
				siteOverlay = $('.vlt-site-overlay');

			if (typeof $.fn.superclick !== 'undefined') {
				navigation.superclick({
					delay: 300,
					cssArrows: false,
					animation: {
						opacity: 'show',
						height: 'show'
					},
					animationOut: {
						opacity: 'hide',
						height: 'hide'
					},
				});
			}

			menuOpen.on('click', function (e) {
				e.preventDefault();
				if (!menuIsOpen) {
					VLTJS.menuOffcanvas.open_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			menuClose.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			VLTJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			// Close after click to anchor.
			navigationItem.filter('[data-menuanchor]').on('click', 'a', function () {
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

		},
		open_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = true;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 1,
					})
					// menu animation
					.fromTo(menu, .6, {
						x: '100%',
					}, {
						x: 0,
						visibility: 'visible'
					}, '-=.3')
					// header animation
					.fromTo(header, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1
					}, '-=.3')
					// navigation item animation
					.fromTo(navigationItem, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15')
					// footer animation
					.fromTo(footer, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15');
			}
		},
		close_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = false;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'inherit'
					})
					// footer animation
					.to(footer, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						}
					})
					// navigation item animation
					.to(navigationItem, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						},
					}, '-=.15')
					// header animation
					.to(header, .3, {
						x: 50,
						autoAlpha: 0,
					}, '-=.15')
					// menu animation
					.to(menu, .6, {
						x: '100%',
					}, '-=.15')
					// set visibility menu after animation
					.set(menu, {
						visibility: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 0
					}, '-=.6');
			}
		}
	};
	VLTJS.menuOffcanvas.init();
})(jQuery);