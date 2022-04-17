$(document).ready(function () {
  // attach an event handler to the "dashboard/users/index" page's delete button
  // this event handler adds "show" class to the modal
  // also pass the data-id attr value from <tr> to the modal's confirm button
  $('.deleteUserBtnClass').on('click', function (e) {
    const id = $(this).parent().parent().attr('data-id')
    e.preventDefault()
    $('#deleteUserModal').addClass('show')
    $('#deleteUserModal #confirmBtn').attr('data-id', id)
  })

  // grab the csrf token from the <head> tag and set it as csrf token for each request
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
  })

  // send a DELETE request to the webapp and redirect if successfull and append error msg to the modal-body if failure
  $('#deleteUserModal').on('click', '#confirmBtn', function (e) {
    e.preventDefault()
    // grab the user id passed from the <tr> to this button
    const id = $(this).attr('data-id')
    $.ajax({
      url: `/dashboard/users/${id}`,
      type: 'DELETE',
      success: function (response) {
        if (!response.error) {
          window.location.href = '/dashboard/users'
        } else {
          // for api errors not server/internal errors
          const warning = `<p class="text-danger pt-1 rounded" id="warning-paragraph">${response.errorMsg}</p>`
          $('#deleteuserModal .modal-body').append(warning)
          setTimeout(function (e) {
            $('#warning-paragraph').remove()
          }, 4000)
        }
      },
      // for server/internal errors
      error: function (request, error) {
        const warning = `
          <p class="text-danger pt-1 rounded" id="warning-paragraph">Internal server error</p>
          `
        $('#deleteUserModal .modal-body').append(warning)
        setTimeout(function (e) {
          $('#warning-paragraph').remove()
        }, 4000)
      },
    })
  })
})
