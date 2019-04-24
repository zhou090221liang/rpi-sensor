const sensor = require('../index');
const ssd1306 = new sensor.SSD1306(1, 0x3C, 128, 64);
ssd1306.oled.turnOnDisplay();
ssd1306.oled.writeChinese(["你好吗", "欢迎使用", "welcome", "欢迎使用", "welcome"]);
setTimeout(() => {
    ssd1306.oled.turnOffDisplay();
}, 10000);