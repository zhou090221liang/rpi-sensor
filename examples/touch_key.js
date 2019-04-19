const sensor = require('../index');
const touchkey = new sensor.TOUCH_KEY(12);
touchkey.key.on("touch", function (status) {
    console.log("接收到按键变化:", status);
});
