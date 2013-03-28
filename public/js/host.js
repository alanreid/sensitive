
if($('body.play').length === 0) {

  $(function() {

    localStorage.clear();

    $('#addPlayer').click(function(e) {
      e.preventDefault();

      $.getJSON('/get_qr', { sess: sessionId }, function(view) {
        loadTemplate('player', view, function(output) {
          var html = $(output).hide();
          $('#players').append(html);
          html.fadeIn(500);
        });
      });
    });

    $('#container').on('click', '.close', function(e) {
      e.preventDefault();

      var elem = $(this).parent().parent().parent();
      elem.fadeOut(300, function() {
        $(this).remove();
      });

    });
  });

  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  var sessionId;
  var socket = io.connect('http://' + location.hostname);

  socket.on('session', function(sess) {
    sessionId = sess;
  });

  socket.on('new_user', function(data) {
    var e = $('.playerContainer[playerid=' + data.player + '] .player');
    connectPlayer(e, data);
  });

  socket.on('orientation_sensor', function(data) {
    var e = $('.playerContainer[playerid=' + data.player + ']');

    e.css({
      webkitTransition: "none",
      webkitTransform: "translateX(-100%) rotateY(" + data.tiltLR + "deg)"
    });

    e.css({
      transition: "none",
      transform: "translateX(-100%) rotateY(" + data.tiltLR + "deg)"
    });
  });

  socket.on('motion_sensor', function(data) {
    var e = $('.playerContainer[playerid=' + data.player + ']');
    e.css({ webkitTransform: "rotate(" + data.gamma + "deg) rotate3d(1,0,0, " + data.beta + "deg)"});
  });

}


function connectPlayer(e, data) {

  $('.back .pic', e).css('background-image', 'url(' + data.picture + ')');
  $('.back h2', e).html(data.name);
  $('.front .close', e).hide();

  var rint = Math.round(0xffffff * Math.random());
  var color = (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255);
  $('.back', e).css('box-shadow', '0px 0px 0px 8px rgba(' + color + ',0.8)');

  $('#start').css('display', 'inline-block');

  $(e).parent().addClass('flipped');
}

function loadTemplate(tpl, view, fn) {

  var template = localStorage.getItem("template_" + tpl);

  if(template !== undefined && template !== null) {
    applyTemplate(template, view, fn);
    return;
  }

  $.get('/js/' + tpl + '.mustache', function(template) {
    localStorage.setItem("template_" + tpl, template);
    applyTemplate(template, view, fn);
  });
}

function applyTemplate(template, view, fn) {
    if(typeof fn == 'function') {
      var html = Mustache.to_html(template, view);
      fn(html);
    }
}
