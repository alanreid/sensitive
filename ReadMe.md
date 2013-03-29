## Sensitive.js
Sensitive.js is an experimental toolkit that enables you to read the sensors of multiple phones at the time and create real-time multiplayer experiences on a single browser.

This is the first version and there's lots to be done, so any help is greatly appreciated!

<img src="http://f.cl.ly/items/3Z140G2p341D38462J44/Screen%20Shot%202013-03-29%20at%202.44.46%20PM.png" height="300" />


### Installation

1. Clone the repo in a clean folder: `git clone git@github.com:alanreid/Sensitive.git && cd Sensitive`

2. Install dependencies: `npm install`

3. Configure a Facebook App and set up the APP ID in `public/js/application.js`

4. Run `node app.js` and open `http://[your ip]:1337/` on your browser (don't use localhost or 127.0.0.1, as you need it to be remotely accessible).


### How does it work?
1. The host user enters the app on his browser and adds players.

2. Each player gets its own QR code.

3. When the QR code is scanned from a mobile device, it redirects the user to the current play session.

4. Each player logs in with his Facebook account.

5. The mobile webapp starts streaming all sensor data to the server and the server back to the host's browser.

<img src="https://www.lucidchart.com/publicSegments/view/5155c738-1148-47aa-9ab0-0aa40a000cd9/image.png" height="300" />


### Supported sensors
* Orientation
* Motion
* Compass
* Location


### What can I do with this?
Well, you name it! I imagine there's plenty of room for very cool multi-user apps, 3D games, light saber battles… 


### Contributing
Glad you made it down here! 

If you find a bug, want to change something or you just have a great feature in mind, just add a new ticket! Of course it's even more awesome if you come up with the solution yourself :) 
