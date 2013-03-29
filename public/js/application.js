
var sensitive = new Sensitive();

sensitive.onAuthInit = function() {

  var that = this;

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

};

sensitive.onPlayerConnect = function(data) {
  var elem = $('.playerContainer[playerid=' + data.player + '] .player');
  $('.back .pic', elem).css('background-image', 'url(' + data.picture + ')');
  $('.back h2', elem).html(data.name);
  $('.front .close', elem).hide();

  var rint = Math.round(0xffffff * Math.random());
  var color = (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255);
  $('.back', elem).css('box-shadow', '0px 0px 0px 8px rgba(' + color + ',0.8)');

  $('#start').css('display', 'inline-block');

  elem.parent().addClass('flipped');
};

sensitive.onPlayerLogin = function(data) {
  $('h2').html('');
  $('#FBlogin').show();
};

sensitive.onPlayerData = function(fbResponse) {

  var data = {
    name: fbResponse.name,
    picture: 'http://graph.facebook.com/' + fbResponse.id + '/picture?type=large'
  };

  $('#FBlogin').hide();
  $('h2').html('Hi ' + data.name + '!').after('<img src="/img/signal.gif" />');

  return data;
};

sensitive.onSensor('orientation', function(data) {
  var elem = $('.playerContainer[playerid=' + data.player + ']');

  elem.css({
    webkitTransition: "none",
    webkitTransform: "translateX(-100%) rotateY(" + data.tiltLR + "deg)"
  });

  elem.css({
    transition: "none",
    transform: "translateX(-100%) rotateY(" + data.tiltLR + "deg)"
  });
});

sensitive.onSensor('motion', function(data) {
  var elem = $('.playerContainer[playerid=' + data.player + ']');
  elem.css({
    webkitTransform: "rotate(" + data.gamma + "deg) rotate3d(1,0,0, " + data.beta + "deg)"
  });
});

sensitive.addSensor(orientationSensor);
//sensitive.addSensor(motionSensor);

$(function() {
  sensitive.init();
});

