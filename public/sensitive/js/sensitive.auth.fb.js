
var facebookProvider = new AuthProvider('fb');

facebookProvider.onAuthInit = function() {

  var that = this;

  (function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
  }(document, /*debug*/ false));

  loadTemplate('login.fb', function(output) {
    $('#sensitive').append(output);
    loadFacebook();
  });

  function loadFacebook() {

    $('#FBlogin').click(function() {
      FB.login(function(response) {
        if(response.authResponse) {
          FB.api('/me?fields=name,picture', function(data) {
            sensitive.sendUserData(data);
          });
        }
      });
    });

    $.getJSON('/facebook.json', function(facebook) {

      window.fbAsyncInit = function() {
        FB.init({
          appId      : facebook.id,
          channelUrl : '/channel.html',
          status     : true,
          cookie     : true,
          xfbml      : false
        });

        FB.getLoginStatus(function(response) {
          if(response.status === 'connected') {
            $('#FBlogin').hide();
            FB.api('/me', function(data) {
              sensitive.sendUserData(data);
            });
          } else {
            that.onPlayerShowLogin();
          }
        });
      };
    });

  }

};

facebookProvider.onPlayerShowLogin = function(data) {
  $('h2').html('');
  $('#FBlogin').show();
};

facebookProvider.onPlayerData = function(fbResponse) {

  var data = {
    name: fbResponse.name,
    picture: 'http://graph.facebook.com/' + fbResponse.id + '/picture?type=large'
  };

  loadTemplate('loggedin', data, function(output) {
    $('#sensitive').html(output);
  });

  return data;
};
