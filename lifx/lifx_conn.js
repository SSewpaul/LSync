const LifxClient = require('lifx-lan-client').Client;
const axios = require('axios');

let client = new LifxClient();;

//add new lights to array
client.on('light-new', light => {
    console.log('Found light: ' + light.id);
});

//turn on lights
let light_on = (delay = 0) =>{
    client.lights().forEach(light => {
        light.on(delay, err => {
            if (err){
                console.log('Cannot turn on light: ' + light.id)
            }
            console.log('Turned on light: ' + light.id)
        });
    });
};

//turn on lights
let light_off = (delay = 0) =>{
    client.lights().forEach(light => {
        light.off(delay, err => {
            if (err){
                console.log('Cannot turn off light: ' + light.id)
            }
            console.log('Turned off light: ' + light.id)
        });
    });
}


// process.stdin.setEncoding('utf8');

// process.stdin.on('data', key => {
//     if (key === '1'){                           // turn on light
//         client.lights().forEach(light => {
//            light.on();
//         });
//     }
//     else if(key == '2'){
//         client.lights().forEach(light => {      // turn off light 
//             light.off();
//         });
//     }
//     else if(key == '0'){
//         client.destroy();
//         process.exit();
//     }
// });

client.init();
