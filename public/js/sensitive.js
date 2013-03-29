
var Sensitive = function() {

  this.container = $('#sensitive');
  this.sessionId = '';
  this.socket = io.connect('http://' + location.hostname);
  this.events = {};
  this.sensors = {};

  var that = this;

  localStorage.clear();

  if(that.isMobile()) {
    that.startMobile(function() {
      that.startMobileTransport();
    });
  } else {
    that.startHost(function() {
      that.startHostTransport();
    });
  }

};

Sensitive.prototype.isMobile = function() {
  var agent = (navigator.userAgent||navigator.vendor||window.opera);
  if(agent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i)) {
    return true;
  }
  return false;
};

Sensitive.prototype.onPlayerConnect = function(data) {};
Sensitive.prototype.onPlayerLogin = function(data) {};
Sensitive.prototype.onPlayerData = function(data) {
  return data;
};
Sensitive.prototype.onAuthInit = function() {};
Sensitive.prototype.init = function() {
  this.onAuthInit();
};
Sensitive.prototype.onSensor = function(sensor, callback) {

  if(typeof callback === 'function') {
    this.events[sensor] = callback;
  } else {
    var data = callback;
    this.events[sensor](data);
  }

};

Sensitive.prototype.watch = function() {
  if(Object.keys(this.sensors).length > 0) {
    for(var sensor in this.sensors) {
      if(typeof this.sensors[sensor].watch === 'function') {
        this.sensors[sensor].watch();
      }
    }
  }
};

Sensitive.prototype.addSensor = function(sensor) {
  sensor.socket = this.socket;
  sensor.data = {
    session: this.sessionId,
    player: this.playerId
  };
  this.sensors[sensor.name] = sensor;
};


var Sensor = function(name) {
  this.name = name;
  this.socket = {};
  this.data = {};
};

Sensor.prototype.watch = function() {};
Sensor.prototype.onEventData = function(eventData) {};
Sensor.prototype.handler = function(eventData) {
  if(this.onEventData(eventData)) {
    this.socket.emit(this.name + '_sensor', this.data);
  }
};










