
var compassSensor = new Sensor('compass');

compassSensor.data.compass = 0;
compassSensor.data.direction = '';

compassSensor.watch = function() {
  var that = this;
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', that.handler.bind(that), false);
  } else {
    console.error('This device doesnt support compass events.');
  }
};

compassSensor.onEventData = function(eventData) {

  var compass = Math.round(data.webkitCompassHeading * Math.pow(10, 2)) / Math.pow(10, 2),
      direction = '',
      emit = false;

  if(data.compass <= 22.5 && data.compass >= 0 || data.compass <= 360 && data.compass >= 337.5) {
    direction = 'N';
  }
  else if(data.compass <= 67.5 && data.compass > 22.5) {
    direction = 'NE';
  }
  else if(data.compass <= 112.5 && data.compass > 67.5) {
    direction = 'E';
  }
  else if(data.compass <= 157.5 && data.compass > 112.5) {
    direction = 'SE';
  }
  else if(data.compass <= 202.5 && data.compass > 157.5) {
    direction = 'S';
  }
  else if(data.compass <= 247.5 && data.compass > 202.5) {
    direction = 'SW';
  }
  else if(data.compass <= 292.5 && data.compass > 247.5) {
    direction = 'W';
  }
  else if(data.compass <= 337.5 && data.compass > 292.5) {
    direction = 'NW';
  }

  if(compass !== this.data.compass) {
    this.data.compass = compass;
    emit = true;
  }

  if(direction !== this.data.direction) {
    this.data.direction = direction;
    emit = true;
  }

  return emit;
};
