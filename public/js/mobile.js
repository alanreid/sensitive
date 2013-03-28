
if($('body.play').length > 0) {

  var sessionId = param('session');
  var playerId  = param('player');

  var socket = io.connect('http://' + location.hostname);

  socket.on('start_sensors', function() {
    setTimeout(Sensitive.watch, 2000);
  });

  $('#FBlogin').click(function() {
    FB.login(function(response) {
      if(response.authResponse) {
        FB.api('/me?fields=name,picture', function(data) {
          sendUserData(data);
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
          sendUserData(data);
        });
      } else {
        $('h2').html('');
        $('#FBlogin').show();
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

}

function sendUserData(fbResponse) {

  var data = {
    session: sessionId,
    player: playerId,
    name: fbResponse.name,
    picture: 'http://graph.facebook.com/' + fbResponse.id + '/picture?type=large'
  };

  socket.emit('save_user', data);

  $('#FBlogin').hide();
  $('h2').html('Hi ' + fbResponse.name + '!');

}

function param(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results === null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
