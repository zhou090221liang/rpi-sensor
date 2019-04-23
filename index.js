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
    TOUCH_KEY: require('./lib/touchkeys').TOUCH_KEY,
    TOUCH_KEY_TYPE: require('./lib/touchkeys').TOUCH_KEY_TYPE,
    TOUCH_KEY2: require('./lib/touchkeys').TOUCH_KEY2,
    /** 
     * SSD1306
    */
    SSD1306: require('./lib/ssd1306')
};