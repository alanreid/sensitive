## Sensitive.js
Sensitive is an experimental node.js module that enables you to read the sensors of multiple phones at the time and create real-time multiplayer experiences on a "host" browser.

This is the first version and there's lots to be done, so any help is greatly appreciated!

<img src="http://f.cl.ly/items/3Z140G2p341D38462J44/Screen%20Shot%202013-03-29%20at%202.44.46%20PM.png" height="300" />

<img src="http://cl.ly/image/2e1n030Z2V2d/2013-03-29%2014.52.33.png" height="300" />

### Intro screencast (spanish)
http://www.youtube.com/watch?v=fZrboc5n_ls

### Installation

1. Install Connect.js and Sensitive.js: `npm install connect sensitive`. Please mind Sensitive requires a QR library that needs libqrencode installed. [Follow these steps](https://github.com/bcelenza/node-qr).

2. In your app.js, attach Sensitive.js to your Connect.js server. Here's an example:
  ```js
  var connect = require('connect'),
      app = connect(),
      http = require('http'),
      sensitive = require('sensitive');

  app.use(connect.favicon())
     .use(connect.logger('dev'))
     .use(connect.static('public'))
     .use(sensitive.attachApp(app));

  var server = http.createServer(app).listen(1337);

  sensitive.attachServer(server);
  ```
3. Create a `public` and a `public/tmp` folder and give it write permissions.

4. Run `node app.js` and open `http://localhost:1337` on your browser.


### How does it work?
1. The host user enters the app on his browser and adds players.

2. Each player gets its own QR code.

3. When the QR code is scanned from a mobile device, it redirects the user to the current play session.

4. Each player logs in with his Facebook account.

5. The mobile webapp starts streaming all sensor data to the server and the server back to the host's browser.

<img src="https://www.lucidchart.com/publicSegments/view/5155c738-1148-47aa-9ab0-0aa40a000cd9/image.png" height="300" />

<img src="https://www.lucidchart.com/publicSegments/view/5155d545-9bf4-444f-8851-7b790a000cd9/image.png" height="220" />

### Supported sensors
* Orientation
* Motion
* Compass
* Location

### Authentication Providers
Sensitive allows you to select how players are authenticated. By default it just asks for the player's name, but you can choose from the following authentication providers:

* Default
* Facebook

##### Authentication Providers: Facebook
1. Create a Facebook App on Facebook (don't forget to set it as a mobile app) and create a `public/facebook.json` file with your app id: `{"id": "<fb app id>"}`.
2. Let Sensitive know that you want to use the facebookProvider: `sensitive.setAuthProvider(facebookProvider);`

### Using & Customizing
Sensitive comes with a built-in demo (the app that runs by default), but you can override this app and create your own.

You can also add your own business logic and completely change the app to your needs. Take a look at `./node_modules/sensitive/public/js/application.js` for an example and add one to your public folder to override it (`public/js/application.js`). You can do exactly the same with the templates (overriding files from `public/sensitive/templates`).

### Client-side Events
* `onPlayerConnect(function(data))`: Called on the host each time a player joins the session.
* `onSensor(<sensor>, function(data))`: Listens for the specified sensor's readings.

### What can I do with this?
Well, you name it! I imagine there's plenty of room for very cool multi-user apps, 3D games, light saber battles…


### Contributing
Glad you made it down here!

If you find a bug, want to change something or you just have a great feature in mind, just add a new ticket! Of course it's even more awesome if you come up with the solution! :)


### License
This software is licensed under the Apache 2 license.
