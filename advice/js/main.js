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

// var TABS = {

// };

// var doc = document,
//     gallery = doc.getElementsByClassName('gallery')[1],
//     // teasers = gallery.getElementsByClassName('teaser'),
//     controls = doc.getElementsByClassName('controls')[1],
//     controlIntems = doc.querySelectorAll('a')[1];

//   controlIntems.addEventListener('click', function() {
//     alert('Work!');
//   });

// var i,
//     doc = document,
//     gallery = doc.getElementById('gallery1'),
//     controlPanel = gallery.getElementsByClassName('controls')[1],
//     controlElement = gallery.getElementsByTagName('a'),
//     targets = doc.getElementsByClassName('teaser');

//   for(i = 0; i < controlElement.length; i++) {

//     controlElement[i].addEventListener('click', function(e) {
//       e.preventDefault();
//       var getTarget = this.getAttribute('href'),
//           targetElement = doc.getElementById(getTarget);

//       targets[1].classList.remove('active');
//       targetElement.classList.add('active');
//     });

//   }

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

});