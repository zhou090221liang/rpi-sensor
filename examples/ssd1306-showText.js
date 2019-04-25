const sensor = require('../index');
const ssd1306 = new sensor.SSD1306(1, 0x3C, 128, 64);
ssd1306.oled.turnOnDisplay();
ssd1306.oled.writeText("2019-04-24 天气：晴，风力：东南风4级，气温：10～20°C，空气质量指数：70...");
setTimeout(() => {
    console.log('停止滚动');
    ssd1306.oled.stopWriteText();
}, 15000);
setTimeout(() => {
    console.log('关闭');
    ssd1306.oled.turnOffDisplay();
}, 16000);