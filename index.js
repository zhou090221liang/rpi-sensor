module.exports = {
    /** 
     * DHT11温湿度传感器
    */
    DHT11: require('./lib/dht').DHT11,
    /** 
     * DHT22温湿度传感器
    */
    DHT22: require('./lib/dht').DHT22,
    /** 
     * 触摸按键传感器
    */
    TOUCH_KEY: require('./lib/touchkeys')
};