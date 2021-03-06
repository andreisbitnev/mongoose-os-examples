load('api_gpio.js');
load('api_file.js');
load('api_mqtt.js');

let led = 13;
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
let relay = 12;
GPIO.set_mode(relay, GPIO.MODE_OUTPUT);

GPIO.write(led, 1);
GPIO.write(relay, 1);

//when the button is pressed, send a message to example_device/getState topic
let button = 0;
GPIO.set_button_handler(button, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 50, function(x) {
    handleGetState(JSON.stringify(GPIO.read(relay)));
}, true);

//Subscribe to “example_device/state” topic, to receive messages from the client
let clientId = "example_device";
let topic = clientId+"/state";
MQTT.sub(topic, function(conn, topic, msg) {
    let operation = JSON.parse(msg).operation;
    if(operation === "getState"){
        handleGetState(JSON.stringify(GPIO.read(relay)));
    }else if(operation === "turnOn"){
        GPIO.write(led, 0);
        GPIO.write(relay, 0);
        handleGetState(JSON.stringify(GPIO.read(relay)));
    }else if(operation === "turnOff"){
        GPIO.write(led, 1);
        GPIO.write(relay, 1);
        handleGetState(JSON.stringify(GPIO.read(relay)));
    }
}, null);

//Send a message to example_device/getState topic with the devices current state
function handleGetState(message){
    let topic = clientId+'/getState';
    let ok = MQTT.pub(topic, message, message.length);
    print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
}
