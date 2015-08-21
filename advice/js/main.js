var waypoint = new Waypoint({
  element: document.getElementById('sidebar'),
  handler: function(direction) {
    if (direction === 'down') {
      this.element.style.position = "fixed";
      this.element.style.top = 0;
    } else if (direction === 'up') {
      this.element.style.position = "";
      this.element.style.top = "";
    }
  }
})

$(document).ready(function() {

  $('.switch').on('click', function(e) {
    e.preventDefault();

    // alert($(this).index());

    var root = $(this).closest('.tabs'),
        target = root.find(root.data('target')),
        trigger = $(this).index();

    target.eq(trigger)
        .add(this)
        .addClass('active')
        .siblings()
        .removeClass('active');

  });

  $('.submit-button').one('click', function(e) {
    e.preventDefault();
    $('.expand-form').addClass('active');
  });

});