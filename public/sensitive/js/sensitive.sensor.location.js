
var locationSensor = new Sensor('location');

locationSensor.data.latitude = 0;
locationSensor.data.longitude = 0;


locationSensor.watch = function() {
  var that = this;
  if(navigator.geolocation) {
    navigator.geolocation.watchPosition(that.handler.bind(that));
  } else {
    console.error('This device doesnt support motion events.');
  }
};

locationSensor.onEventData = function(eventData) {

  var latitude = eventData.coords.latitude,
      longitude = position.coords.longitude,
      emit  = false;

  if(latitude !== this.data.latitude) {
    this.data.latitude = latitude;
    emit = true;
  }

  if(longitude !== this.data.longitude) {
    this.data.longitude = longitude;
    emit = true;
  }

  return emit;
};
