
Sensitive.prototype.startHost = function(callback) {

  var that = this;

  if(that.container.length === 0) {
    console.error('Sensitive: HTML tag missing.');
    return false;
  }

  loadTemplate('players', function(output) {

      that.container.hide().html(output).fadeIn(500);

      $('#addPlayer').click(function(e) {
        e.preventDefault();

        $.getJSON('/get_qr', { sess: that.sessionId }, function(view) {
          loadTemplate('player', view, function(output) {
            var html = $(output).hide();
            $('#players').prepend(html);
            html.fadeIn(500);
          });
        });
      });

      that.container.on('click', '.close', function(e) {
        e.preventDefault();

        $(this).parent().parent().parent().fadeOut(300, function() {
          $(this).remove();
        });

      });

      callback();

    });
};

Sensitive.prototype.startHostTransport = function() {

  var that = this;

  that.socket.on('session', function(sess) {
    that.sessionId = sess;
  });

  that.socket.on('new_user', function(data) {
    that.onPlayerConnect(data);
  });

  if(Object.keys(this.sensors).length > 0) {
    for(var sensor in this.sensors) {
      if(typeof this.sensors[sensor] === 'object') {
        that.socket.on(sensor + '_sensor', function(data) {
          that.onSensor(sensor, data);
        });
      }
    }
  }

};
