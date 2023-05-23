/* API-based OLP form validation and lead creation for France */

var coregApi = {

    validatePhone: function() {

        $("#phone").attr("disabled", "disabled");

        // Validate phone
        var url_phone = "/api/v1/isvalidphone/fr/" + $("#phone").val() + "/ws/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";

        $.getJSON(url_phone, function(result) {

            // Redirect check
            if (result.redirect) {
                if (typeof DisableExitSplash == 'function') {
                    DisableExitSplash();
                }
                window.location.replace(result.redirect);
            }

            // Valid phone
            if (result.data == "true") {
                coregApi.validateZip();
            }

            // Invalid phone
            else {
                $.fancybox.hideActivity();
                coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
                alert($.i18n.prop("valid.phone"));
                $("#phone").attr("disabled", "");
            }

        });
	},


    validateEmail: function() {

        $("#email").attr("disabled", "disabled");
        $("#firstName").attr("disabled", "disabled");
        $("#lastName").attr("disabled", "disabled");

        // Validate email and first/last name
        var url_email = "/api/v1/isvalid/" + $("#email").val() + "/" + $("#firstName").val() + "/" + $("#lastName").val() + "/ws/" + "?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";

        $.getJSON(url_email, function(result) {

            // Redirect check
            if (result.redirect) {
                if (typeof DisableExitSplash == 'function') {
                    DisableExitSplash();
                }
                window.location.replace(result.redirect);
            }

            // Valid email
            if (result.data == "PASS") {
                if ($("#phone").length) {
                    coregApi.validatePhone();
                }
                else {
                    coregApi.validateZip();
                }
            }

            // Invalid email
            else {
                $.fancybox.hideActivity();
                coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
                alert($.i18n.prop("invalid.name_or_email"));
                $("#email").attr("disabled", "");
                $("#firstName").attr("disabled", "");
                $("#lastName").attr("disabled", "");
            }

        });
    },


    validateZip: function() {

        $("#zip").attr("disabled", "disabled");

        // Validate postal code
        var url_zip = "/api/v1/gettowns/fr/" + $("#zip").val() + "/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";

        $.getJSON(url_zip, function(result) {

            // Redirect check
            if (result.redirect) {
                if (typeof DisableExitSplash == 'function') {
                    DisableExitSplash();
                }
                window.location.replace(result.redirect);
            }

            // Valid zip
            if (result.data != 'false' && result.data.towns.length > 0) {

                $("a#fancylink").fancybox({
                    'modal': true,
                    'inline': true,
                    'href': '#address-selection'
                });

                $('#addressList').html('');
                var a;
                for (var i = 0; i < result.data.towns.length; i++) {
                    a = result.data.towns[i];
                    b = result.data.state;
                    $('#addressList').append('<li><a href="javascript:void(0);" onclick="if ($.olp_var.addressSelected == false) { $.olp_var.addressSelected = true; $.fancybox.close(); coregApi.selectAddress(\'' + a + '\',\'' + b + '\'); }">' + decodeTwo(a) + ', ' + decodeTwo(b) + '</a></li>');
                }
                $('#addressList').append('<li><a href="javascript:void(0);" onclick="$.fancybox.close(); coregUtility.addSubmitClickHandler(); $(\'#zip\').attr(\'disabled\',\'\');">'+$.i18n.prop("add.town")+'</a></li>');

                $.fancybox.hideActivity();
                $("a#fancylink").click();
            }

            // Invalid zip
            else {
                $.fancybox.hideActivity();
                coregUtility.addSubmitClickHandler(); // Re-bind submit click handler since validation failed
                alert($.i18n.prop("add.postcode"));
                $("#zip").attr("disabled", "");
            }

        });
    },


    selectAddress: function(city, state) {
        
        $("#city").val(decodeTwo(city));
        $("#state").val(decodeTwo(state));

        coregApi.createLead();
    },


    createLead: function() {

        var url = "/api/v1/createlead/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";

        var email = $("#email").val();
        var title = $("#title").val();
        var gender = $("#gender").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var zip = $("#zip").val();
        var address1 = $("#address1").val();
        var city = $("#city").val();
        var state = $("#state").val();
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

        $.ajax( {
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
                city: city,
                state: state,
                phone: phone,
                FRTelephone: phone,
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
                subPublisherId: subPublisherId
            },

            success: function (result) {

                result = $.parseJSON(result);

                if (result.redirect) {
                    if (typeof DisableExitSplash == 'function') {
                        DisableExitSplash();
                    }
                    window.location.replace(result.redirect);
                }

                if (result.status === "OK") {
                    $.olp_var.leadId = result.data.leadId;
                    coregOffers.submitHiddenMiniOffers();
                    coregOffers.submitVisibleMiniOffers();
                    pop();
                    if (typeof DisableExitSplash == 'function') {
                        DisableExitSplash();
                    }
                    if (funnel) {
                        window.location = 'path.html' + funnel; // Enter the path and pass parameters
                    }
                    else {
                        window.location = 'path.html'; // Enter the path
                    }
                }
                else {
                    alert("Failed to create lead.");
                }
            }

        });

    }

};