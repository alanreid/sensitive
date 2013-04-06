
var sensitive = new Sensitive();

sensitive.setAuthProvider(facebookProvider);

sensitive.addSensor(orientationSensor);
//sensitive.addSensor(motionSensor);
//sensitive.addSensor(compassSensor);
//sensitive.addSensor(locationSensor);

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

$(function() {
  sensitive.init();
});

