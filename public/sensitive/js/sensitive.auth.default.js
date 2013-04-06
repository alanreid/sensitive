
var defaultProvider = new AuthProvider('default');

defaultProvider.onAuthInit = function() {
  sensitive.sendUserData(prompt('Please enter your name:'));
};

defaultProvider.onPlayerData = function(input) {

  var data = {
    name: input,
    picture: '/sensitive/img/player.png'
  };

  loadTemplate('loggedin', data, function(output) {
    $('#sensitive').html(output);
  });

  return data;
};
