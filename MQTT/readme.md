<b>MQTT example</b></br>
The example shows how to turn on/off the ESP8266 powered sonoff switch using mongoose-os mqtt_api, and and eclipse paho javascript client on the client side</br>
First of all, you need to flash your sonoff switch with mongoose-os firmware. A detailed tutorial can be found <a href="https://www.linkedin.com/pulse/javascript-firmware-iot-andrei-sbitnev">here</a></br>
Then, just upload the init.js file to the device and open an index.html file in the browser</br></br>
In this example we connect the device to the public broker “broker.hivemq.com”.</br></br>
If you want to connect to a private broker, then you'll have to provide a username and password in the index.html file</br></br>
  client.connect({onSuccess:onConnect, userName: 'username', password: 'password'});
 
