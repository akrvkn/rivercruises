$(function() {

	// Get the form.
    //$('#url').val(window.location.href);
	var form = $('#adam-contact-form');

	// Get the messages div.
	var formMessages = $('.adam-form-send-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.

		var formData = $(form).serialize();
        if(location.search) {
            formData += '&url='+ encodeURIComponent(location.href);
        }
		// Submit the form using AJAX.
		if($('#contact-phone').val()=='') {
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text('Ваше сообщение отправлено');

                    // Clear the form.
                    $('#adam-contact-form input[type="text"], #adam-contact-form input[type="email"], #adam-contact-form textarea').val('');
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                    }
                });
        }
	});

});
