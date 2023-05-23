/* OLP global variables */

// Create a new object to allow us to namespace all our global variables
$.olp_var = new Object();

// Initialize and set all our validation variables
$.olp_var.addressSelected = false;
$.olp_var.phoneValidated = false;
$.olp_var.phoneValid = false;
$.olp_var.phoneInvalid = false;
$.olp_var.phoneTooSlow = false;

// Create new array into which our mini-offers can be inserted
$.olp_var.offerArray = {};

$.olp_var.leadId = "";

// Our API key
$.olp_var.apikey = "intela-9a0843d7-da06-466e-b908-36ae8eb5bdf3";

// Multiple choice game answer
$.olp_var.correctAnswer = "";