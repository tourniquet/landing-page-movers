/* jslint es5: true, multistr: true */

$(document).ready(function() {
	// https://eonasdan.github.io/bootstrap-datetimepicker/
	$('.datetimepicker').datetimepicker({
		format: 'MMM Do, YYYY'
	});

	// https://silviomoreto.github.io/bootstrap-select/
	$('.selectpicker').selectpicker();


	// form validation http://jqueryvalidation.org/
	var form = $('#form-order');
	form.validate({
		rules: {
			'form-client-name': {
				required: true
			},

			'form-phone': {
				required: true
			},

			'form-email': {
				email: true
			},

			'form-moving-from-address': {
				required: true
			},

			'form-moving-from-city': {
				required: true
			},

			'form-moving-from-zip': {
				required: true
			},

			'form-moving-to-address': {
			},

			'form-moving-to-city': {
			},

			'form-moving-to-zip': {
			},

			'form-home-type': {
				required: true
			},

			'form-form-moving-date': {
			}
		}
	});

	form.validate();


	// remove placeholder on focus
	$('input[type="text"]')
		.focus( function(){
			$(this).attr("data-placeholder", $(this).attr('placeholder')).removeAttr("placeholder");
		})
		// add placeholder on focus out if input is empty
		.blur( function(){
			$(this).attr("placeholder", $(this).attr('data-placeholder'));
		});
});


// send data from form to email
var sendFormData = function() {
	var clientName = $('#form-client-name').val();
	var clientPhone = $('#form-phone').val();
	var clientEmail = $('#form-email').val();
	var fromAddress = $('#form-moving-from-address').val();
	var fromCity = $('#form-moving-from-city').val();
	var fromZip = $('#form-moving-from-zip').val();
	var toAddress = $('#form-moving-to-address').val();
	var toCity = $('#form-moving-to-city').val();
	var toZip = $('#form-moving-to-zip').val();
	var homeType = $('#form-home-type').val();
	var movingDate = $('#form-moving-date').val();

	var message = '\
		Name: ' + clientName + '\n' +'\
		Phone: ' + clientPhone + '\n' +'\
		Email: ' + clientEmail + '\n' +'\
		Pick up address: ' + fromAddress + '\n' +'\
		From city: ' + fromCity + '\n' +'\
		From zip: ' + fromZip + '\n' +'\
		Destionation address: ' + toAddress + '\n' +'\
		To city: ' + toCity + '\n' +'\
		To zip: ' + toZip + '\n' +'\
		Home type: ' + homeType + '\n' +'\
		Moving date: ' + movingDate + '\n';

	$.ajax({
		url: 'contact.php',
		type: 'POST',
		data: { 'message': message }
	});

	if ($('#form-order').valid())
		$('#form-modal').modal('toggle');
};


// add .active class to clicked link
$(".nav a").on("click", function(){
	$(".nav").find(".active").removeClass("active");
	$(this).parent().addClass("active");

	if ($('#navbar-collapse').attr('aria-expanded')  == 'true')
		$('#navbar-collapse').collapse('toggle');
});


var clock = $('.your-clock').FlipClock();
