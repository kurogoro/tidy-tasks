$(document).on('turbolinks:load', function() {
  var dateFormat = 'yy/mm/dd';
  $('.date-picker').datepicker({
    dateFormat: dateFormat,
    minDate: 0
  });
})
