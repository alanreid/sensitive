var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

server.listen(1337);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./sensitive').sensitive(server, app);

process.on('uncaughtException', function(err){
  console.log(err);
});
