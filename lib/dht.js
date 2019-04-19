/** 
 * DHT11/DHT22 温湿度传感器
*/

const comm = require('./comm');
const sensorLib = require("node-dht-sensor");

class DHT {
    /**
     *Creates an instance of DHT11/DHT22.
     * @param {*} no
     * @memberof DHT
     */
    constructor(no, type) {
        this.bcm = comm.GPIO_MAPPING[no.toString()].BCM;
        this.type = type;
        sensorLib.initialize(this.type, this.bcm);
    }

    read() {
        return sensorLib.read();
    }
}

class DHT11 extends DHT {
    /**
     *Creates an instance of DHT11.
     * @param {*} 
     * @memberof DHT11
     */
    constructor(no) {
        super(no, 11);
    }
};

class DHT22 extends DHT {
    /**
     *Creates an instance of DHT22/AM2302.
     * @param {*} 
     * @memberof DHT22/AM2302
     */
    constructor(no) {
        super(no, 22);
    }
};

module.exports = {
    DHT11: DHT11,
    DHT22: DHT22
};