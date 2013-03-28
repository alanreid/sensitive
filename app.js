var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    Encoder = require('qr').Encoder,
    url = require('url'),
    uuid = require('node-uuid'),
    encoder = new Encoder();

server.listen(1337);

var hostAddress;
require('dns').lookup(require('os').hostname(), function(err, add, fam) {
  hostAddress = add;
});

app.configure(function(){
  app.set('config', require('./config.json'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('config').session));
  app.use(express.session({
      secret: app.get('config').session
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/play', function(req, res) {
    res.render('play');
});

app.get('/get_qr', function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var sessionId = parsedUrl.query.sess;

    // TODO: VALIDATE SESSIONID

    if(typeof sessionId == 'undefined') {
        res.json({ error: 'no sessionid provided' });
        return;
    }

    var playerId = uuid.v4();
    var qrPath = '/tmp/qr_' + sessionId + playerId + '.png';

    encoder.encode('http://' + hostAddress + ':1337/play?session=' + sessionId + '&player=' + playerId, 'public' + qrPath);

    encoder.on('end', function(){
      res.json({ path: qrPath, player: playerId });
    });

});

io.sockets.on('connection', function(socket) {

    var sessionId = uuid.v4();
    // TODO: SAVE SESSIONID

    socket.emit('session', sessionId);
    socket.join(sessionId);

    socket.on('save_user', function(data) {
      // TODO: SAVE USER INFO
      io.sockets.in(data.session).emit('new_user', data);
      io.sockets.emit('start_sensors', data);
    });

    socket.on('orientation_sensor', function(data) {
      io.sockets.in(data.session).emit('orientation_sensor', data);
    });

    socket.on('motion_sensor', function(data) {
      io.sockets.in(data.session).emit('motion_sensor', data);
    });
});

process.on('uncaughtException', function(err){
  console.log(err);
});
