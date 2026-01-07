/* OLP utility functions */

$(document).ready(function () {
  //console.profile("utility.js profile");
  coregUtility.addPhoneHandler();
  coregUtility.addNameHandler();
  coregUtility.addContinueClickHandler();
  coregUtility.addSubmitClickHandler();
  coregUtility.phoneRemoveDigits();
  coregUtility.zipTrim();
  coregUtility.addSubmit();
  //console.profileEnd("utility.js profile");
});

var coregUtility = {
  // ----- STRING MANIPULATION

  // Function used for decoding JSON strings and replacing +'s with spaces
  decodeTwo: function (string) {
    return decodeURIComponent(string.replace(/\+/g, " "));
  },

  // Function that removes all digits from a given string
  removeDigits: function (string) {
    return string.replace(/\d+/g, "");
  },

  // Function that removes all non-digits from a given string
  removeNonDigits: function (string) {
    return string.replace(/[^0-9]/g, "");
  },

  // ----- FIELD HANDLING AND VALUE MANIPULATION

  // Function to update the hidden full DOB field from the separate day/month/year select boxes, needs to be called inline
  updateDob: function () {
    $("#dob").val(
      $("#dobDay").val() +
        "/" +
        $("#dobMonth").val() +
        "/" +
        $("#dobYear").val()
    );
  },

  // ----- EVENT LISTENERS/HANDLERS

  // Binds an onChange event to the phone field, needs to in initialized on the document ready event
  // Only needed for pre submission phone validation
  addPhoneHandler: function () {
    $("#phone").bind("change", function () {
      $("#phone").val(coregUtility.removeNonDigits($("#phone").val()));
      if ($("#phone").val() != "") {
        // This function is contained within the api module
        coregApi.validatePhone();
      }
    });
  },

  // Binds onChange event to the first and last name fields, to automatically remove any from the entered data
  addNameHandler: function () {
    $("#firstName, #lastName").bind("change", function () {
      var nameContents = $(this).val();
      $(this).val(coregUtility.removeDigits(nameContents));
    });
  },

  // Rebinds the click function to an on-page continue button
  // This needs to be initialized on document ready
  addContinueClickHandler: function () {
    $("#continue-button")
      .unbind("click")
      .click(function () {
        $("#continue-button").unbind("click");
        // This function is contained with the form module
        coregForm.validateForm();
      });
  },

  // Rebinds the click function to an on-page submit button
  // This needs to be initialized on document ready
  addSubmitClickHandler: function () {
    $("#submit-button")
      .unbind("click")
      .click(function () {
        $("#submit-button").unbind("click");
        // This function is contained with the form module
        coregForm.validateVisibleOffers();
      });
  },

  // Binds an onChange event to the phone field to remove all digits
  // This needs to be initialized on document ready
  phoneRemoveDigits: function () {
    $("#phone").change(function () {
      $("#phone").val(coregUtility.removeNonDigits($("#phone").val()));
    });
  },

  // Binds an onChange event to the zip fields and trims all whitespace from the beginning and the end of the value
  // This needs to be initialized on document ready
  zipTrim: function () {
    $("#zip").change(function () {
      $("#zip").val($.trim($("#zip").val()));
    });
  },

  // ----- DOM MANIPULATION AND INSERTION

  // This function dynamically appends the submit button to the DOM
  // This needs to be initialized on document ready
  addSubmit: function () {
    var div_submit = $("<div><div id='submit-button'><!-- --></div></div>");
    $("#submit").append(div_submit);
    coregUtility.addSubmitClickHandler();
  },
};
