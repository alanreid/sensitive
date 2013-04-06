
var orientationSensor = new Sensor('orientation');

orientationSensor.data.tiltLR    = 0;
orientationSensor.data.tiltFB    = 0;
orientationSensor.data.direction = 0;

orientationSensor.watch = function() {
  var that = this;
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', that.handler.bind(that), false);
  } else {
    console.error('This device doesnt support orientation events.');
  }
};

orientationSensor.onEventData = function(eventData) {

  var tiltLR = Math.round(180 + eventData.gamma, this.data.tiltLR),
      tiltFB = Math.round(eventData.beta - 90, this.data.tiltFB),
      emit   = false;

  if(tiltFB !== this.data.tiltFB) {
    this.data.tiltFB = tiltFB;
    emit = true;
  }

  if(tiltLR !== this.data.tiltLR) {
    this.data.tiltLR = tiltLR;
    emit = true;
  }

  return emit;
};
