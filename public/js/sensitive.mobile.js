
Sensitive.prototype.startMobile = function(callback) {

  var that = this;
  this.sessionId = param('session');
  this.playerId  = param('player');

  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  $('#FBlogin').click(function() {
    FB.login(function(response) {
      if(response.authResponse) {
        FB.api('/me?fields=name,picture', function(data) {
          that.sendUserData(data);
        });
      }
    });
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '157671151056564',
      channelUrl : '/channel.html',
      status     : true,
      cookie     : true,
      xfbml      : false
    });

    FB.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $('#FBlogin').hide();
        FB.api('/me', function(data) {
          that.sendUserData(data);
        });
      } else {
        that.onPlayerLogin();
      }
    });
  };

  (function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
  }(document, /*debug*/ false));

  callback();

};

Sensitive.prototype.startMobileTransport = function() {

  var that = this;
  that.socket.on('start_sensors', function() {
    setTimeout(that.watch.bind(that), 2000);
  });

};

Sensitive.prototype.sendUserData = function(fbResponse) {

  var data = {
    session: this.sessionId,
    player: this.playerId,
    name: fbResponse.name,
    picture: 'http://graph.facebook.com/' + fbResponse.id + '/picture?type=large'
  };

  this.socket.emit('save_user', data);
  this.onPlayerData(data);
};
