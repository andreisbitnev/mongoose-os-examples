//first, let's load the required api-s
load('api_gpio.js');
load('api_rpc.js');

//configure pins for the led indicator and relay swith.
// On "sonoff" they are 13 and 12 pins respectively
let led = 13;
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
let relay = 12;
GPIO.set_mode(relay, GPIO.MODE_OUTPUT);

//Set led and switch tol "LOW"
//Usually "LOW" = 0 and "HIGH" = 1, but on sonoff its vice versa for some reason,so
//"LOW" = 1, "HIGH" = 0
GPIO.write(led, 1);
GPIO.write(relay, 1);

//Create the RPC function "state", which receives an operation: getState/turnOn/turnOff
RPC.addHandler('state', function(args) {
    if(args.operation === 'getState'){
        return GPIO.read(relay);
    }else if(args.operation === 'turnOn'){
        GPIO.write(led, 0);
        GPIO.write(relay, 0);
        return GPIO.read(relay);
    }else if(args.operation === 'turnOff'){
        GPIO.write(led, 1);
        GPIO.write(relay, 1);
        return GPIO.read(relay);
    }
});