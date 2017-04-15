load('api_gpio.js');
load('api_file.js');
load('api_mqtt.js');

// Configure LED
let led = 13;
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

// Configure relay
let relay = 12;
GPIO.set_mode(relay, GPIO.MODE_OUTPUT);

GPIO.write(led, 1);
GPIO.write(relay, 1);

let pin = 0;
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 50, function(x) {
    //handleGetState();
    handleGetState(JSON.stringify(GPIO.read(relay)));
}, true);

//subscribe to getState topic to receive message, and send relay state
let clientId = "example_device";
let topic = '/andreisbitnev@gmail.com/'+clientId+"/state";
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

function handleGetState(message){
    let topic = '/andreisbitnev@gmail.com/'+clientId+'/getState';
    let ok = MQTT.pub(topic, message, message.length);
    print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
}