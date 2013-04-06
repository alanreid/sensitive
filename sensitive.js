
var socketio = require('socket.io'),
    Encoder  = require('qr').Encoder,
    url      = require('url'),
    uuid     = require('node-uuid'),
    encoder  = new Encoder(),
    fs       = require('fs'),
    connect  = require('connect');

var hostAddress, port = 1337;

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
  hostAddress = add;
});

exports.attachApp = function(app) {

  app.use(connect.static(__dirname + '/public'));

  return function(req, res, next) {

    var parsedUrl = url.parse(req.url, true);

    if(parsedUrl.pathname == '/get_qr') {

      var session = parsedUrl.query.sess;

      // TODO: VALIDATE SESSIONID

      if(session === undefined) {
        res.write(JSON.stringify({ error: 'no session provided' }));
        res.end();
        return;
      }

      var playerId = uuid.v4();
      var qrPath = '/tmp/qr_' + session + '_' + playerId + '.png';

      encoder.encode('http://' + hostAddress + ':' + port + '/?session=' + session + '&player=' + playerId, 'public' + qrPath);

      encoder.on('end', function() {
        res.write(JSON.stringify({ path: qrPath, player: playerId }));
        res.end();
      });

    } else {
      next();
    }

  };

};

exports.attachServer = function(server) {

  // TODO: Find a less hacky way to get the port number
  port = server._connectionKey.split(':')[2];

  var io = socketio.listen(server);

  io.sockets.on('connection', function(socket) {

    var session = uuid.v4();
    // TODO: SAVE SESSIONID

    socket.emit('session', session);
    socket.join(session);

    socket.on('save_user', function(data) {
      // TODO: SAVE USER INFO
      io.sockets.in(data.session).emit('new_user', data);

      fs.unlink('public/tmp/qr_' + data.session + data.player + '.png');

      io.sockets.emit('start_sensors', data);
    });

    // TODO: REPLACE THIS WITH A GENERIC EVENT
    socket.on('orientation_sensor', function(data) {
      io.sockets.in(data.session).emit('orientation_sensor', data);
    });

    socket.on('motion_sensor', function(data) {
      io.sockets.in(data.session).emit('motion_sensor', data);
    });

    socket.on('compass_sensor', function(data) {
      io.sockets.in(data.session).emit('compass_sensor', data);
    });

    socket.on('location_sensor', function(data) {
      io.sockets.in(data.session).emit('location_sensor', data);
    });
  });

  return server;

};


