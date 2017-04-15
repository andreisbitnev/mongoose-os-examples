<b>RPC example</b></br>
The example shows how to turn on/off the ESP8266 powered sonoff switch using mongoose-os RPC function.</br>
It also demonstrates the built in http server.</br>
First of all, you need to flash your sonoff switch with mongoose-os firmware. A detailed tutorial can be found <a href="https://www.linkedin.com/pulse/javascript-firmware-iot-andrei-sbitnev">here</a></br>
Then, just upload both files to the device and open your sonoff ip address in the browser (for example http://192.168.0.103/)</br></br>
If the index.html file is launched from any other device on the local network, the sonoff ip address should be added to the AJAX request url</br>
 function sendRequest(operation){</br>
       $.ajax({</br>
           url: "http://192.168.0.103/rpc/state",</br>
           method: "POST",</br>
           data: JSON.stringify({"operation":operation})</br>
       }).done(function(state) {</br>
           handleGetState(state);</br>
       });</br>
   }</br>
   </br>
   To control your swith over the internet check out this example with <a href="https://github.com/andreisbitnev/mongoose-os-examples/tree/master/MQTT">MQTT protocol</a>
