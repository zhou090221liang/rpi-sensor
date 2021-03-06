/** 
 * 扩展方法参考 https://github.com/LanFly/Device
 * https://www.npmjs.com/package/oled-i2c-bus
*/
const font = require('oled-font-5x7');
const i2c = require('i2c-bus');
let i2cBus;
let oled = require('oled-i2c-bus');;
const pngparse = require('pngparse');
const floydSteinberg = require('floyd-steinberg');
const pngtolcd = require('png-to-lcd');
const Canvas = require('canvas');

const createImageData = function (image) {
    var buf = new Buffer(image.width * image.height * 4);
    var l = image.data.length;
    var pos = 0;
    for (var y = 0; y < image.height; y++) {
        for (var x = 0; x < image.width; x++) {
            buf.writeUInt32BE(image.getPixel(x, y), pos);
            pos += 4;
        }
    }
    image.data = buf;
    return image;
}

const imageDataToOLEDBuffer = function (imageData, dither, isCanvas) {
    var pimage;
    if (isCanvas) {
        pimage = imageData;
    } else {
        pimage = this.createImageData(imageData);
    }
    var pixels = pimage.data,
        pixelsLen = pixels.length,
        height = pimage.height,
        width = pimage.width,
        alpha = pimage.hasAlphaChannel,
        threshold = 120,
        unpackedBuffer = [],
        depth = 4;
    var buffer = new Buffer((width * height) / 8);
    buffer.fill(0x00);
    if (dither) {
        floydSteinberg(pimage);
    }
    for (var i = 0; i < pixelsLen; i += depth) {
        var pixelVal = pixels[i + 1] = pixels[i + 2] = pixels[i];
        if (pixelVal > threshold) {
            pixelVal = 1;
        } else {
            pixelVal = 0;
        }
        unpackedBuffer[i / depth] = pixelVal;
    }
    for (var i = 0; i < unpackedBuffer.length; i++) {
        var x = Math.floor(i % width);
        var y = Math.floor(i / width);
        var byte = 0,
            page = Math.floor(y / 8),
            pageShift = 0x01 << (y - 8 * page);
        (page === 0) ? byte = x : byte = x + width * page;
        if (unpackedBuffer[i] === 0) {
            buffer[byte] &= ~pageShift;
        } else {
            buffer[byte] |= pageShift;
        }
    }
    return buffer;
}

const utils = {
    /**
     * 把canvas中的像素点映射成OLED屏幕的像素点格式
     * @param {Canvas} canvas    要映射的canvas实例
     * @param {Boolean} dither    是否抖动
     * @return {Buffer}
     */
    canvasToOLEDBuffer: function (canvas, dither, config) {
        var sx = config.sx || 0,
            sy = config.sy || 0,
            sw = config.sw,
            sh = config.sh;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(sx, sy, sw, sh);
        return imageDataToOLEDBuffer(imageData, dither, true);
    },
    /**
     * 将PNG图片转换为OLED屏幕的像素点格式
     * @param {string} pngFileName    png图片的地址
     * @param {Boolean} dither    是否启用抖动算法
     * @param {Function} callback    回调函数，第一个参数是error，第二个是Buffer
     */
    pngToOLEDBuffer: function (pngFileName, dither, callback) {
        pngparse.parseFile(pngFileName, function (err, imageData) {
            if (err) {
                return callback(err);
            }
            var buffer = base.imageDataToOLEDBuffer(imageData, dither);
            callback(null, buffer);
        });
    }
};

class SSD1306 {
    constructor(number, address, width, height) {
        i2cBus = i2c.openSync(number != void 0 ? number : 1);
        const opts = {
            width: width || 128,
            height: height || 64,
            address: address || 0x3C
        };
        this.font = font;
        this.config = opts;
        this.config.i2cNumber = number;
        this.oled = new oled(i2cBus, opts);
        /**
         * 将canvas的像素点绘制到屏幕上，注意，目前不支持彩色
         * @param {canvas} canvas    要绘制的canvas
         * @param {Object} config    配置从canvas中要绘制的矩形区域
         */
        this.oled.drawCanvas = function (canvas, config) {
            var sx = 0;
            var sy = 0;
            // var sw = this.config.width;
            // var sh = this.config.height;
            var sw = this.WIDTH;
            var sh = this.HEIGHT;
            if (config) {
                sx = config.sx || 0;
                sy = config.sy || 0;
                // sw = config.sw || this.config.width;
                // sh = config.sh || this.config.height;
                sw = config.sw || this.WIDTH;
                sh = config.sh || this.HEIGHT;
            }
            // 把canvas转换为OLED的像素点格式
            var oledBuffer = utils.canvasToOLEDBuffer(canvas, false, {
                sx: sx,
                sy: sy,
                sw: sw,
                sh: sh
            });
            // 设置OLED屏幕像素映射的buffer
            // this.oled.buffer = oledBuffer;
            this.buffer = oledBuffer;
            // 刷新屏幕
            // this.oled.update();
            this.update();
        }
        /**
         * 将PNG图片绘制到屏幕上，只支持PNG图片
         * @param {string} filename    PNG图片的路径
         * @param {Boolean} dither    是否启动抖动算法，建议不启用
         * @param {Function} callback    绘制完后的回调函数，第一个参数是error
         */
        this.oled.drawPNG = function (filename, dither, callback) {
            var self = this;
            utils.pngToOLEDBuffer(filename, dither, function (error, buffer) {
                if (error) {
                    callback(error);
                } else {
                    // self.oled.buffer = buffer;
                    // self.oled.update();
                    self.buffer = buffer;
                    self.update();
                    callback(null);
                }
            });
        }
        this.oled.writeChinese = function (chinese) {
            var canvas = new Canvas(this.WIDTH, this.HEIGHT);
            var ctx = canvas.getContext('2d');
            ctx.font = '21px Impact';
            ctx.fillStyle = '#FFF';
            // ctx.fillText("hello Canvas", 0, 20);
            // ctx.fillText("你好", 0, 50);
            chinese = chinese && chinese.length && (typeof chinese == 'object') ? chinese : (chinese ? [chinese] : []);
            for (let i = 0; i < chinese.length; i++) {
                ctx.fillText(chinese[i], 0, 21 * (i + 1));
            }
            this.drawCanvas(canvas);
        },
            this.oled.writeText = function (text, scrollInterval) {
                function getPixel(text) {
                    let pixel = 0;
                    for (let t of text) {
                        if (Buffer.from(t).length == 1) {
                            pixel += 10.7;
                        } else {
                            pixel += 21.4;
                        }
                    }
                    return pixel;
                }
                text = text || "";
                this.AUTO_SCROLL_TEXT = null;
                var canvas = new Canvas(this.WIDTH, this.HEIGHT);
                var ctx = canvas.getContext('2d');
                ctx.font = '21px Impact';
                ctx.fillStyle = '#FFF';
                let str = new Array();
                // console.log("需要显示的文字：" + text + "，文字长度：" + text.length + "，字节长度：" + Buffer.from(text).length);
                for (let i = 0; i < text.length; i++) {
                    let last = "";
                    if (str.length > 0) {
                        last = str[str.length - 1];
                    }
                    let nowLen = getPixel(text[i]);
                    let lastLen = getPixel(last);
                    // console.log("当前循环序列：" + i.toString() + "，上一个字符:" + last + "，累加后字符:" + (last + text[i])
                    //     + ",累加后字节长度:" + Buffer.from(last + text[i]).length.toString() + ",占用像素:"
                    //     + (nowLen + lastLen).toString() + ",显示器像素:" + this.WIDTH.toString());
                    if ((lastLen + nowLen) >= this.WIDTH) {
                        // console.log("已经超过显示器宽度，新起一行");
                        str.push(text[i]);
                    } else {
                        if (last) {
                            str[str.length - 1] += text[i];
                            // console.log("未超过显示器像素宽度，在最后一行中拼接");
                        } else {
                            // console.log("未超过显示器像素宽度，但为第一行");
                            str.push(text[i]);
                        }
                    }
                    // console.log("当前循环序列:" + i.toString() + "完成。结果：" + str.join((process.platform === 'win32') ? '\n\r' : '\n'));
                }
                function show(oled, text, start) {
                    // console.log("into show...", start, oled.WIDTH, oled.HEIGHT);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // console.log(text[start], 0, 21);
                    ctx.fillText(text[start] != void 0 ? text[start] : "", 0, 21);

                    // console.log(text[start + 1], 0, 42);
                    ctx.fillText(text[start + 1] != void 0 ? text[start + 1] : "", 0, 42);

                    // console.log(text[start + 2], 0, 64);
                    ctx.fillText(text[start + 2] != void 0 ? text[start + 2] : "", 0, 63);

                    oled.drawCanvas(canvas);

                    start++;
                    if (start == text.length) {
                        start = 0;
                    }

                    if (text.length > 3) {
                        oled.AUTO_SCROLL_TEXT = setTimeout(() => {
                            show(oled, text, start);
                        }, scrollInterval || 1500);
                    }
                }
                show(this, str, 0);
            },
            this.oled.stopWriteText = function () {
                if (this.AUTO_SCROLL_TEXT) {
                    clearTimeout(this.AUTO_SCROLL_TEXT);
                    // this.clearDisplay();
                    this.AUTO_SCROLL_TEXT = null;
                }
            }
    }
}

module.exports = SSD1306;