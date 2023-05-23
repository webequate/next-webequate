/* Non-API form validation for JeJoue */

var coregForm = {

    // This function maps the selected title into the associated gender
	setGender: function(title) {
        var values = {
            "mr" : "m",
            "mrs" : "f",
            "ms" : "f",
            "miss" : "f"
        };

        for(var name in values) {
            if(title == name) {
                document.getElementById("gender").value = values[name];
                break;
            }
        }
	},

    // ----- NON-API FORM VALIDATION

    // Validate for the full form on submit, this function is called by a click event on the submit button
    validateForm: function() {

        // Validate required fields
        var fields = ['email', 'title', 'firstName', 'lastName', 'address1', 'zip', 'phone', 'dobDay', 'dobMonth', 'dobYear'];
        for (var i=0; i<fields.length; i++) {
            if ($('#'+fields[i]).length && !$('#'+fields[i]).val()) {
                coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
                alert($.i18n.prop("fields.required"));
                return false;
            }
        }

        // Validate terms and conditions
        if(!$('#terms').is(':checked')) {
            coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
            alert($.i18n.prop("valid.terms"));
            return false;
        }

        // Validate landing form
        if ($("#landingForm").valid() == true) {
            $.fancybox.showActivity();
            coregApi.validateEmail();
        }
        else {
            addSubmitClickHandler(); // Re-bind submit click handler since validation failed
            alert($.i18n.prop("valid.errors"));
        }

	},

    // ----- OFFER VALIDATION

    validateVisibleOffers: function() {
        var offersChecked = true;
        $.each($.olp_var.offerArray, function() {
            if_checked = !!$(":radio[name=" + this + "]:checked").length;
            if (!if_checked) {
                offersChecked = false;
            }
        });
        if (!offersChecked) {
            coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
            alert("Please select Yes or No on all offers");
            return false;
        }

        $.fancybox.showActivity();
        coregOffers.submitVisibleMiniOffers();
        window.location = 'path.html'; // Enter the path
	}

};