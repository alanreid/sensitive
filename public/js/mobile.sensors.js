

var Sensitive = {
  sensors: {},
  watch: function() {
    for(var sensor in Sensitive.sensors) {
      Sensitive.sensors[sensor].watch();
    }
  }
};



Sensitive.sensors.orientation = {

  data: {
    tiltLR: 0,
    tiltFB: 0,
    direction: 0
  },

  watch: function() {
    if(window.DeviceOrientationEvent) {
      Sensitive.sensors.orientation.data.session = sessionId;
      Sensitive.sensors.orientation.data.player = playerId,
      window.addEventListener('deviceorientation', Sensitive.sensors.orientation.handler, false);
    } else {
      console.error('This device doesnt support orientation events.');
    }
  },

  handler: function(eventData) {

    var tiltLR = Math.round(180 + eventData.gamma, Sensitive.sensors.orientation.data.tiltLR),
        tiltFB = Math.round(eventData.beta - 90, Sensitive.sensors.orientation.data.tiltFB),
        emit   = false;

    if(tiltFB !== Sensitive.sensors.orientation.data.tiltFB) {
      Sensitive.sensors.orientation.data.tiltFB = tiltFB;
      emit = true;
    }

    if(tiltLR !== Sensitive.sensors.orientation.data.tiltLR) {
      Sensitive.sensors.orientation.data.tiltLR = tiltLR;
      emit = true;
    }

    if(emit) {
      socket.emit('orientation_sensor', Sensitive.sensors.orientation.data);
    }
  }

};




if(window.DeviceMotionEvent) {
  //window.addEventListener('devicemotion', motionHandler, false);
}

function motionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " + Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";

    var facingUp = -1;
  if (acceleration.z >
  0) {
    facingUp = +1;
  }

    socket.emit('motion_sensor', {
    session: sessionId,
    player: playerId,
    gamma: Math.round(((acceleration.x) / 9.81) * -90),
    beta: Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp)
  });

}
