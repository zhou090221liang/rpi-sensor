const sensorLib = require("node-dht-sensor");

class DHT {
    /**
     *Creates an instance of DHT11/DHT22.
     * @param {*} BCM_no BCM编号,非pin编号,如BCM4=Pin7
     * @memberof DHT
     */
    constructor(BCM_no, type) {
        this.BCM_no = BCM_no;
        this.type = type;
        sensorLib.initialize(this.type, this.BCM_no);
    }

    read() {
        return sensorLib.read();
    }
}

class DHT11 extends DHT {
    /**
     *Creates an instance of DHT11.
     * @param {*} BCM_no BCM编号,非pin编号,如BCM4=Pin7
     * @memberof DHT11
     */
    constructor(BCM_no) {
        super(BCM_no, 11);
    }
};

class DHT22 extends DHT {
    /**
     *Creates an instance of DHT22/AM2302.
     * @param {*} BCM_no BCM编号,非pin编号,如BCM4=Pin7
     * @memberof DHT22/AM2302
     */
    constructor(BCM_no) {
        super(BCM_no, 22);
    }
};

module.exports = {
    DHT11: DHT11,
    DHT22: DHT22
};