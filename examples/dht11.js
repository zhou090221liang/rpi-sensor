const sensor = require('../index');
const dht11 = new sensor.DHT11(4);
setInterval(() => {
    const result = dht11.read();
    console.log('result:', result);
}, 5000);