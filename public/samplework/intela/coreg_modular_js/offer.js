/* OLP mini-offer handling */

var coregOffers = {


    populateMiniOffers: function(filterOffers) {

        if (filterOffers) {
            var url_offers = "/api/v1/path/getoffers/0/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3&pubId=" + pub_id + "&subPubId=" + subpub_id;
        } else {
            var url_offers = "/api/v1/path/"+path_name+"/page/0/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3&pubId=" + pub_id + "&subPubId=" + subpub_id;
        }

        $.getJSON(url_offers, function(result) {

            if (result.redirect) {
                if (typeof DisableExitSplash == 'function') {
                    DisableExitSplash();
                }
                window.location.replace(result.redirect);
            }

            if(result.status == 'OK' && result.data.offers.length > 0) {
                var markup = "";
                var offer;
                for (var i = 0; i < result.data.offers.length; i++) {
                    offer = result.data.offers[i];
                    if (offer.isHidden) {
                        markup += '<input type="hidden" name="mini_'+offer.id+'" value="yes" />';
                    }
                    else {
                        markup += '<div class="mini-offer">';
                        markup += '<img style="float:left" src="'+offer["small_image_background-image"]+'" />';
                        markup += '<p>'+coregUtility.decodeTwo(offer.description)+'</p>';
                        markup += '<input type="radio" name="mini_'+offer.id+'" style="display:none" />';
                        if (offer.isPreSelected) {
                            markup += '<input type="radio" name="mini_'+offer.id+'" value="yes" class="radioField" checked="checked" />' + $.i18n.prop("label.yes") + ',';
                        }
                        else {
                            markup += '<input type="radio" name="mini_'+offer.id+'" value="yes" class="radioField" />' + $.i18n.prop("label.yes") + ',';
                        }
                        markup += '<input type="radio" name="mini_'+offer.id+'" value="no" class="radioField" />' + $.i18n.prop("label.no");
                        markup += '<div style="clear:both"><!-- --></div>';
                        markup += '</div>';
                        //Add displayable mini offers to the array
                        $.olp_var.offerArray[i] = "mini_"+offer.id;
                    }
                }
                $("#mini-offers").html(markup);
            }
            else {
                //alert("No offers.");
            }
        });
	},


    submitHiddenMiniOffers: function() {

        $.ajaxSetup({async:false});

        // Accept hidden mini-offers
        $("input[type='hidden'][name^='mini_']").each(function() {
            var offerid = $(this).attr('name');
            offerid = offerid.replace('mini_','');
            var url = "/api/v1/acceptoffer/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";
            var data = {
                offerId: offerid,
                pathId: path_id,
                leadId: $.olp_var.leadId
            }
            $.post(url, data, function (result) {
                result = $.parseJSON(result);
                if (result.status === "OK") {
                    //alert('Accepted hidden mini-offer ' + result.data.offerid);
                } else {
                    //alert('Failed to accept hidden mini-offer');
                }
            });
        });
	},


    submitVisibleMiniOffers: function() {

        $.ajaxSetup({async:false});

        // Accept mini-offers with Yes radio buttons selected and accept hidden mini-offers
        $("input[type='radio'][name^='mini_'][value='yes']:checked").each(function() {
            var offerid = $(this).attr('name');
            offerid = offerid.replace('mini_','');
            var url = "/api/v1/acceptoffer/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";
            var data = {
                offerId: offerid,
                pathId: path_id,
                leadId: $.olp_var.leadId
            }
            $.post(url, data, function (result) {
                result = $.parseJSON(result);
                if (result.status === "OK") {
                    //alert('Accepted offer ' + result.data.offerid);
                } else {
                    //alert('Failed to accept offer');
                }
            });
        });

        // Reject mini-offers with No radio buttons selected
        $("input[type='radio'][name^='mini_'][value='no']:checked").each(function() {
            var offerid = $(this).attr('name');
            offerid = offerid.replace('mini_','');
            var url = "/api/v1/rejectoffer/?apikey=intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";
            var data = {
                offerId: offerid,
                pathId: path_id,
                leadId: $.olp_var.leadId
            }
            $.post(url, data, function (result) {
                result = $.parseJSON(result);
                if (result.status === "OK") {
                    //alert('Rejected offer ' + result.data.offerid);
                } else {
                    //alert('Failed to reject offer');
                }
            });
        });
    }


};
