
var motionSensor = new Sensor('motion');

motionSensor.data.gamma = 0;
motionSensor.data.beta  = 0;

motionSensor.watch = function() {
  var that = this;
  if(window.DeviceOrientationEvent) {
    window.addEventListener('devicemotion', that.handler.bind(that), false);
  } else {
    console.error('This device doesnt support motion events.');
  }
};

motionSensor.onEventData = function(eventData) {

  var acceleration = eventData.accelerationIncludingGravity;
  var facingUp = -1;

  if(acceleration.z > 0) {
    facingUp = 1;
  }

  var gamma = Math.round(((acceleration.x) / 9.81) * -90),
      beta  = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp),
      emit  = false;

  if(gamma !== this.data.gamma) {
    this.data.gamma = gamma;
    emit = true;
  }

  if(beta !== this.data.beta) {
    this.data.beta = beta;
    emit = true;
  }

  return emit;
};
