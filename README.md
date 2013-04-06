## Sensitive.js
Sensitive is an experimental node.js module that enables you to read the sensors of multiple phones at the time and create real-time multiplayer experiences on a "host" browser.

This is the first version and there's lots to be done, so any help is greatly appreciated!

<img src="http://f.cl.ly/items/3Z140G2p341D38462J44/Screen%20Shot%202013-03-29%20at%202.44.46%20PM.png" height="300" />

<img src="http://cl.ly/image/2e1n030Z2V2d/2013-03-29%2014.52.33.png" height="300" />

### Installation

1. Install Sensitive.js: `npm install sensitive`. Please mind Sensitive requires a QR library that needs libqrencode installed. [Follow these steps](https://github.com/bcelenza/node-qr).

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
3. Create a `public` and a `public/tmp` folder
4. Configure a Facebook App and set up the APP ID in a `public/facebook.json` file with this content: `{"id": "<fb app id>"}`.

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

### Using & Customizing
Sensitive comes with a built-in demo (the app that runs by default), but you can override this app and create your own.

You can also add your own business logic and completely change the app to your needs. Take a look at `./node_modules/sensitive/public/js/application.js` for an example and add one to your public folder to override it (`public/js/application.js`). You can do exactly the same with the templates (overriding files from `public/sensitive/templates`).

### Client-side Events
* `onAuthInit(function())`: Only called on the mobile phone, as soon as all sensors are loaded.
* `onPlayerConnect(function(data))`: Called on the host to announce a new player.
* `onPlayerLogin()`: Displays the login message/form/button.
* `onPlayerData(function(data))`: Gets the user's data after logging in.
* `onSensor(<sensor>, function(data))`: Listens for sensor readings.

### What can I do with this?
Well, you name it! I imagine there's plenty of room for very cool multi-user apps, 3D games, light saber battles…


### Contributing
Glad you made it down here!

If you find a bug, want to change something or you just have a great feature in mind, just add a new ticket! Of course it's even more awesome if you come up with the solution! :)


### License
This software is licensed under the Apache 2 license, quoted below.
```
Copyright 2013 Alan Reid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

