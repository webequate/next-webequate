/* Non-API form validation for PrizesUK */

var coregForm = {
  // This function maps the selected title into the associated gender
  setGender: function (title) {
    var values = {
      mr: "m",
      mrs: "f",
      ms: "f",
      miss: "f",
    };

    for (var name in values) {
      if (title == name) {
        document.getElementById("gender").value = values[name];
        break;
      }
    }
  },

  // ----- NON-API FORM VALIDATION

  // Validate for the full form on submit, this function is called by a click event on the submit button
  validateForm: function () {
    var fields = [
      "email",
      "title",
      "firstName",
      "lastName",
      "zip",
      "phone",
      "dobDay",
      "dobMonth",
      "dobYear",
    ];
    for (var i = 0; i < fields.length; i++) {
      if (!$("#" + fields[i]).val()) {
        coregUtility.addContinueClickHandler();
        alert("All fields are required.");
        return false;
      }
    }

    if (!$("#terms_box").is(":checked")) {
      coregUtility.addContinueClickHandler();
      alert("You must agree to the terms and conditions.");
      return false;
    }

    if ($("#landingForm").valid()) {
      $.fancybox.showLoading();
      // This function is contained within the api module
      coregApi.validateEmail();
    } else {
      if ($.olp_var.phoneInvalid) {
        coregUtility.addContinueClickHandler();
        alert("Please enter a valid phone number.");
      } else {
        coregUtility.addContinueClickHandler();
        alert("Please fix your errors.");
      }
    }
  },

  // ----- OFFER VALIDATION

  validateVisibleOffers: function () {
    var offersChecked = true;
    $.each($.olp_var.offerArray, function () {
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

    $.fancybox.showLoading();
    coregOffers.submitVisibleMiniOffers();
    window.location = "path.html"; // Enter the path
  },
};
