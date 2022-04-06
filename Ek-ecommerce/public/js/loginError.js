$(document).ready(function () {
  $('#loginErrorDiv').on('click', 'button', function (e) {
    e.preventDefault()
    $('#loginErrorDiv').hide()
  })

  setTimeout(() => {
    $('#loginErrorDiv').hide()
  }, 4000)
})
