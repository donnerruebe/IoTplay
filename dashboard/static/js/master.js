$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
});

$.fn.gauge = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.gauge) {
      data.gauge.stop();
      delete data.gauge;
    }
    if (opts !== false) {
      data.gauge = new Gauge(this).setOptions(opts);
    }
  });
  return this;
};
