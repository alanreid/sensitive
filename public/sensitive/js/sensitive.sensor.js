
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
