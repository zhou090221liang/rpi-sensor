const font = require('oled-font-5x7');
const i2c = require('i2c-bus');
let i2cBus;
let oled = require('oled-i2c-bus');;
const pngparse = require('pngparse');
const pngtolcd = require('png-to-lcd');

class SSD1306 {
    constructor(number, address, width, height) {
        i2cBus = i2c.openSync(number != void 0 ? number : 1);
        const opts = {
            width: width || 128,
            height: height || 64,
            address: address || 0x3C
        };
        this.font = font;
        this.oled = new oled(i2cBus, opts);
        // this.oled = {
        //     clearDisplay: oled.clearDisplay,
        //     dimDisplay: (value) => {
        //         if (value != true && value != false) {
        //             value = true;
        //         }
        //         oled.dimDisplay(value);
        //     },
        //     invertDisplay: (value) => {
        //         if (value != true && value != false) {
        //             value = true;
        //         }
        //         oled.invertDisplay(value);
        //     },
        //     turnOffDisplay: oled.turnOffDisplay,
        //     turnOnDisplay: oled.turnOnDisplay,
        //     drawPixel: (arr) => {
        //         oled.drawPixel(arr);
        //     },
        //     drawLine: oled.drawLine,
        //     fillRect: oled.fillRect,
        //     drawBitmap: (file) => {
        //         return new Promise(function (resolve, reject) {
        //             pngparse.parseFile(file, function (err, image) {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     oled.drawBitmap(image.data);
        //                     resolve();
        //                 }
        //             });
        //         });
        //     },
        //     drawBitmap2: (file) => {
        //         return new Promise(function (resolve, reject) {
        //             pngtolcd('nyan-cat.png', true, function (err, bitmap) {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     oled.buffer = bitmap;
        //                     oled.update();
        //                     resolve();
        //                 }
        //             });
        //         });
        //     },
        //     drawRGBAImage: oled.drawRGBAImage,
        //     startScroll: oled.startScroll,
        //     stopScroll: oled.stopScroll,
        //     setCursor: oled.setCursor,
        //     writeString: (text, size, wrapping) => {
        //         text = text || '';
        //         size = size || 2;
        //         wrapping = wrapping != void 0 ? wrapping : true;
        //         oled.setCursor(1, 1);
        //         oled.writeString(font, size, text, 1, wrapping);
        //     },
        //     update: oled.update
        // };
    }
}

module.exports = SSD1306;