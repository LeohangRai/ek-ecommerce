$(document).ready(function () {
  $('.messages').on('click', 'button', function (e) {
    e.preventDefault()
    $('.messages').hide()
  })

  setTimeout(() => {
    $('.messages').hide()
  }, 6000)

  //error messages on form input fields
  setTimeout(() => {
    $('.input-field-messages').hide()
  }, 6000)
})
