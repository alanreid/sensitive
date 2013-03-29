
exports.sensitive = function(server, app) {

  var io      = require('socket.io').listen(server),
      Encoder = require('qr').Encoder,
      url     = require('url'),
      uuid    = require('node-uuid'),
      encoder = new Encoder(),
      fs      = require('fs');

  var hostAddress;
  require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    hostAddress = add;
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/play', function(req, res) {
    res.render('play');
  });

  app.get('/get_qr', function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var session = parsedUrl.query.sess;

    // TODO: VALIDATE SESSIONID

    if(typeof session === undefined) {
      res.json({ error: 'no session provided' });
      return;
    }

    var playerId = uuid.v4();
    var qrPath = '/sensitive/tmp/qr_' + session + playerId + '.png';

    encoder.encode('http://' + hostAddress + ':' + server.address().port + '/play?session=' + session + '&player=' + playerId, 'public' + qrPath);

    encoder.on('end', function(){
      res.json({ path: qrPath, player: playerId });
    });

  });

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

    socket.on('orientation_sensor', function(data) {
      io.sockets.in(data.session).emit('orientation_sensor', data);
    });

    socket.on('motion_sensor', function(data) {
      io.sockets.in(data.session).emit('motion_sensor', data);
    });
  });

};
