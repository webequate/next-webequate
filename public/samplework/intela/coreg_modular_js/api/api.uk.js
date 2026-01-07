/* API-based OLP form validation and lead creation for UK */

var coregApi = {
  validatePhone: function () {
    $.olp_var.phoneValidated = false;
    $.olp_var.phoneValid = false;
    $.olp_var.phoneInvalid = false;
    $.olp_var.phoneTooSlow = false;

    $("#phone").attr("disabled", "disabled");

    var url_phone =
      "/api/v1/isvalidphone/uk/" +
      $("#phone").val() +
      "/ws/?apikey=" +
      $.olp_var.apikey;

    $.getJSON(url_phone, function (result) {
      $.olp_var.phoneValidated = true;

      if (result.redirect) {
        window.location.replace(result.redirect);
      }

      if (result.data == "true") {
        $.olp_var.phoneValid = true;
        $.olp_var.phoneInvalid = false;
        $("#row_phone .valid-fail").remove();
        $("#row_phone").append("<div class='valid-true'></div>");
        //console.log("Phone valid = true");
      } else {
        $.fancybox.hideLoading();
        $.fancybox.close();
        $("#zip").attr("disabled", false);
        if (!$.olp_var.phoneTooSlow) {
          coregUtility.addContinueClickHandler();
          $.olp_var.addressSelected = false;
          alert("Invalid phone.");
          //alert($.i18n.prop("valid.phone"));
        }
        $.olp_var.phoneInvalid = true;
        $.olp_var.phoneValid = false;
        $.olp_var.phoneTooSlow = false;
        $("#phone").attr("disabled", false);
        $("#row_phone .valid-fail").remove();
        $("#row_phone").append("<div class='valid-fail'></div>");
        //console.log("Phone valid = false");
      }
    });
  },

  validateEmail: function () {
    $("#email").attr("disabled", "disabled");
    $("#firstName").attr("disabled", "disabled");
    $("#lastName").attr("disabled", "disabled");

    var url_email =
      "/api/v1/isvalid/" +
      $("#email").val() +
      "/" +
      $("#firstName").val() +
      "/" +
      $("#lastName").val() +
      "/ws/" +
      "?apikey=" +
      $.olp_var.apikey;

    $.getJSON(url_email, function (result) {
      if (result.redirect) {
        window.location.replace(result.redirect);
      }

      if (result.data == "PASS") {
        $(
          "#row_email .valid-fail, #row_firstName .valid-fail, #row_lastName .valid-fail"
        ).remove();
        $("#row_email, #row_firstName, #row_lastName").append(
          "<div class='valid-true'></div>"
        );
        coregApi.validateZip();
      } else {
        $.fancybox.hideLoading();
        coregUtility.addContinueClickHandler();
        alert("Invalid email or name.");
        //alert($.i18n.prop("valid.name"));
        $("#email").attr("disabled", false);
        $("#firstName").attr("disabled", false);
        $("#lastName").attr("disabled", false);
        $(
          "#row_email .valid-fail, #row_firstName .valid-fail, #row_lastName .valid-fail"
        ).remove();
        $("#row_email, #row_firstName, #row_lastName").append(
          "<div class='valid-fail'></div>"
        );
      }
    });
  },

  validateZip: function () {
    $("#zip").attr("disabled", "disabled");

    var url_zip =
      "/api/v1/getaddresses/" +
      $("#zip").val() +
      "/?apikey=" +
      $.olp_var.apikey;

    $.getJSON(url_zip, function (result) {
      if (result.redirect) {
        window.location.replace(result.redirect);
      }
      if (result.data == "false" || result.data.addresses.length == 0) {
        $.fancybox.hideLoading();
        coregUtility.addContinueClickHandler();
        alert("Invalid postal code.");
        //alert($.i18n.prop("add.postcode"));
        $("#zip").attr("disabled", false);
        $("#row_zip .valid-fail").remove();
        $("#row_zip").append("<div class='valid-fail'></div>");
      } else {
        //alert("VALID - Zip");
        $("a#fancylink").fancybox({
          modal: true,
          inline: true,
          href: "#address-selection",
        });
        $("#addressList").html("");
        var a;

        for (var i = 0; i < result.data.addresses.length; i++) {
          var caption = "";
          a = result.data.addresses[i];
          if ($.trim(a.address2) != "") {
            caption += ", ";
            caption += a.address2;
            caption += ", ";
          } else {
            caption += ", ";
          }

          $("#addressList").append(
            '<li><a href="javascript:void(0);" onclick="if ($.olp_var.addressSelected == false) { $.olp_var.addressSelected = true; $.fancybox.close(); coregApi.selectAddress(\'' +
              a.town +
              "','" +
              a.house +
              "','" +
              a.houseNumber +
              "','" +
              a.houseName +
              "','" +
              a.street +
              "','" +
              a.address1 +
              "','" +
              a.address2 +
              "'); }\">" +
              a.address1 +
              caption +
              a.town +
              "</a></li>"
          );
        }
        $("#addressList").append(
          "<li><a href=\"javascript:void(0);\" onclick=\"$.fancybox.close(); coregUtility.addContinueClickHandler(); $('#zip').attr('disabled','');\">My address is not listed here</a></li>"
        );
        $.fancybox.hideLoading();
        $("a#fancylink").click();
        $("#row_zip .valid-fail").remove();
        $("#row_zip").append("<div class='valid-true'></div>");
      }
    });
  },

  selectAddress: function (
    town,
    house,
    houseNumber,
    houseName,
    street,
    address1,
    address2
  ) {
    $("#city").val(town);
    $("#house").val(house);
    $("#houseNumber").val(houseNumber);
    $("#houseName").val(houseName);
    $("#street").val(street);
    $("#address1").val(address1);
    $("#address2").val(address2);

    if ($.olp_var.phoneValidated) {
      if ($.olp_var.phoneValid) {
        $.fancybox.showLoading();
        coregApi.createLead();
      } else {
        // Phone was validated, but found to be invalid
        $.fancybox.close();
        coregUtility.addContinueClickHandler();
        $.olp_var.addressSelected = false;
        //alert("Please enter a valid phone number.");
        alert($.i18n.prop("valid.phone"));
      }
    } else {
      $.fancybox.showLoading();
      $.olp_var.phoneTooSlow = true;
      coregApi.createLead();
    }
  },

  createLead: function () {
    var url = "/api/v1/createlead/?apikey=" + $.olp_var.apikey;

    var email = $("#email").val();
    var title = $("#title").val();
    var gender = $("#gender").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var zip = $("#zip").val();
    var address1 = $("#address1").val();
    var address2 = $("#address2").val();
    var house = $("#house").val();
    var houseNumber = $("#houseNumber").val();
    var houseName = $("#houseName").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var phone = $("#phone").val();
    var dob = $("#dob").val();
    var dobDay = $("#dobDay").val();
    var dobMonth = $("#dobMonth").val();
    var dobYear = $("#dobYear").val();
    var t_o = $("#t_o").val();
    var t_eid = $("#t_eid").val();
    var sourceUrl = window.location.href;
    var pathId = path_id;
    var pathName = path_name;
    var publisherId = "";
    if (pub_id != null) {
      publisherId = pub_id;
    }
    var subPublisherId = "";
    if (subpub_id != null) {
      subPublisherId = subpub_id;
    }

    $.ajax({
      type: "POST",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: url,
      data: {
        email: email,
        title: title,
        gender: gender,
        firstName: firstName,
        lastName: lastName,
        zip: zip,
        address1: address1,
        address2: address2,
        house: house,
        houseName: houseName,
        houseNumber: houseNumber,
        street: street,
        city: city,
        phone: phone,
        dob: dob,
        dobDay: dobDay,
        dobMonth: dobMonth,
        dobYear: dobYear,
        t_o: t_o,
        t_eid: t_eid,
        sourceUrl: sourceUrl,
        pathId: pathId,
        pathName: pathName,
        publisherId: publisherId,
        subPublisherId: subPublisherId,
      },
      success: function (result) {
        result = $.parseJSON(result);

        if (result.redirect) {
          window.location.replace(result.redirect);
          return;
        }

        if (
          result.status === "OK" &&
          $("#nextbutton").css("display") == "none"
        ) {
          $.olp_var.leadId = result.data.leadId;
          coregOffers.populateMiniOffers(true);
          $.fancybox.hideLoading();
          $("#registration-top, #registration-body").addClass("registered");
          $("#registration-body").html("");
          $("#nextbutton").show();
          coregOffers.submitHiddenMiniOffers();
        } else if (
          result.status === "OK" &&
          $("#nextbutton").css("display") == "block"
        ) {
          coregOffers.submitHiddenMiniOffers();
          coregOffers.submitVisibleMiniOffers();
          window.location = "path.html"; // Enter the path
        } else {
          alert("Failed to create lead");
          console.log("Error:" + result.error);
        }
      },
    });
  },
};
