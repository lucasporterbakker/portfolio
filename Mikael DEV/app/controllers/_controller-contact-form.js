/***********************************************
 * WIDGET: CONTACT FORM
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.contactForm = {
		init: function () {
			// check if plugin defined
			if (typeof $.fn.validate == 'undefined') {
				return;
			}
			var el = $('.vlt-contact-form');
			el.each(function () {
				var thisForm = $(this),
					successMessage = thisForm.find('.message.success'),
					errorMessage = thisForm.find('.message.danger');
				thisForm.validate({
					errorClass: 'error',
					submitHandler: function (form) {
						$.ajax({
							type: 'POST',
							url: 'handler.php',
							data: new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success: function () {
								successMessage.fadeIn();
								setTimeout(function () {
									successMessage.fadeOut();
								}, 5000);
							},
							error: function () {
								errorMessage.fadeIn();
								setTimeout(function () {
									errorMessage.fadeOut();
								}, 5000);
							}
						});
					}
				});

			});
		}
	}
	VLTJS.contactForm.init();

})(jQuery);