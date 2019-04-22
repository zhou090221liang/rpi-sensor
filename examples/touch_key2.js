const sensor = require('../index');
const touchkey = new sensor.TOUCH_KEY2(12, {
    TYPE: sensor.TOUCH_KEY_TYPE.UNLOCK_HIGHT,
    LONG_TOUCH_TIME: 500,
    DOUBLE_TOUCH_TIME: 200
});
touchkey.key.on("touch", function (status) {
    console.log("接收到按键变化:", status);
});
