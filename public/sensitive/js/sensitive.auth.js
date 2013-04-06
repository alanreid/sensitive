
var AuthProvider = function(name) {
  this.name = name;
};

AuthProvider.prototype.onAuthInit = function() {};

AuthProvider.prototype.onPlayerShowLogin = function() {};

AuthProvider.prototype.onPlayerData = function(data) {
  return data;
};
