Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const weekName1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekName2 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const sensor = require('../index');
const ssd1306 = new sensor.SSD1306(1, 0x3C, 128, 64);
ssd1306.oled.turnOnDisplay();
setInterval(() => {
    ssd1306.oled.clearDisplay();
    const now = new Date();
    const date = now.Format('yyyy-MM-dd');
    const time = now.Format('hh:mm:ss');
    const day = now.getDay();
    const week = weekName1[day] + "(" + weekName2[day] + ")";
    console.log("显示:", date, time);
    ssd1306.oled.setCursor(0, 0);
    ssd1306.oled.writeString(ssd1306.font, 2, date);
    ssd1306.oled.setCursor(0, 16);
    ssd1306.oled.writeString(ssd1306.font, 2, time);
    ssd1306.oled.setCursor(0, 32);
    ssd1306.oled.writeString(ssd1306.font, 2, week);
}, 1000);