/* globals $ */

$(document).ready(() => {
  // https://eonasdan.github.io/bootstrap-datetimepicker/
  $('.datetimepicker').datetimepicker({
    format: 'MMM Do, YYYY'
  })

  // https://silviomoreto.github.io/bootstrap-select/
  $('.selectpicker').selectpicker()

  // form validation http://jqueryvalidation.org/
  var form = $('#form-order')
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
  })

  form.validate()

  // remove placeholder on focus
  $('input[type="text"]')
    .focus(() => {
      $(this).attr('data-placeholder', $(this).attr('placeholder')).removeAttr('placeholder')
    })
    // add placeholder on focus out if input is empty
    .blur(() => {
      $(this).attr('placeholder', $(this).attr('data-placeholder'))
    })
})

// send data from form to email
const sendFormData = () => {
  const clientName = $('#form-client-name').val()
  const clientPhone = $('#form-phone').val()
  const clientEmail = $('#form-email').val()
  const fromAddress = $('#form-moving-from-address').val()
  const fromCity = $('#form-moving-from-city').val()
  const fromZip = $('#form-moving-from-zip').val()
  const toAddress = $('#form-moving-to-address').val()
  const toCity = $('#form-moving-to-city').val()
  const toZip = $('#form-moving-to-zip').val()
  const homeType = $('#form-home-type').val()
  const movingDate = $('#form-moving-date').val()

  // var message = '\
  //   Name: ' + clientName + '\n' +'\
  //   Phone: ' + clientPhone + '\n' +'\
  //   Email: ' + clientEmail + '\n' +'\
  //   Pick up address: ' + fromAddress + '\n' +'\
  //   From city: ' + fromCity + '\n' +'\
  //   From zip: ' + fromZip + '\n' +'\
  //   Destionation address: ' + toAddress + '\n' +'\
  //   To city: ' + toCity + '\n' +'\
  //   To zip: ' + toZip + '\n' +'\
  //   Home type: ' + homeType + '\n' +'\
  //   Moving date: ' + movingDate + '\n';

  const message = `
    Name: ${clientName}
    Phone: ${clientPhone}
    Email: ${clientEmail}
    Pick up address: ${fromAddress}
    From city: ${fromCity}
    From zip: ${fromZip}
    Destionation address: ${toAddress}
    To city: ${toCity}
    To zip: ${toZip}
    Home type: ${homeType}
    Moving date: ${movingDate}`

  $.ajax({
    url: 'contact.php',
    type: 'POST',
    data: { 'message': message }
  })

  if ($('#form-order').valid()) {
    $('#form-modal').modal('toggle')
  }
}

// add .active class to clicked link
$('.nav a').on('click', () => {
  $('.nav').find('.active').removeClass('active')
  $(this).parent().addClass('active')

  if ($('#navbar-collapse').attr('aria-expanded') === 'true') {
    $('#navbar-collapse').collapse('toggle')
  }
})

const clock = $('.your-clock').FlipClock()
