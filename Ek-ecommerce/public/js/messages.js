$(document).ready(function () {
  $('.messages').on('click', 'button', function (e) {
    e.preventDefault()
    $('.messages').hide()
  })

  setTimeout(() => {
    $('.messages').hide()
  }, 4000)
})
