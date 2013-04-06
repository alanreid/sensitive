
Sensitive.prototype.startMobile = function(callback) {

  var that = this;
  this.sessionId = param('session');
  this.playerId  = param('player');

  $('body').addClass('play');

  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  callback();
};

Sensitive.prototype.startMobileTransport = function() {

  var that = this;
  that.socket.on('start_sensors', function() {
    setTimeout(that.watch.bind(that), 2000);
  });

};

Sensitive.prototype.sendUserData = function(data) {

  var info = {
    session: this.sessionId,
    player: this.playerId,
    name: 'N/A',
    picture: ''
  };

  this.socket.emit('save_user', $.extend(info, this.authProvider.onPlayerData(data)));
};
