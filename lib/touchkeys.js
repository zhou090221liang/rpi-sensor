/** 
 * 触摸按键模块
*/
const comm = require('./comm');
const Gpio = require('pigpio').Gpio;
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();

/** 
 * 工作模式
 * 点动：按下输出、松开停止
 * 自锁：按一下输出，再按一下停止
*/
const TOUCH_KEY_TYPE = {
    /** 
     * 点动高电平输出（默认）
    */
    UNLOCK_HIGHT: 1,
    /** 
     * 自锁高电平输出
    */
    LOCK_HIGHT: 2,
    /** 
     * 点动低电平输出
    */
    UNLOCK_LOW: 3,
    /** 
     * 自锁低电平输出
    */
    LOCK_LOW: 4
};

class TOUCH_KEY {
    constructor(no, setting) {
        this.key = event;
        this.no = comm.GPIO_MAPPING[no.toString()].BCM;
        const _defaultSetting = {
            TYPE: TOUCH_KEY_TYPE.UNLOCK_HIGHT,
            LONG_TOUCH_TIME: 500,
            DOUBLE_TOUCH_TIME: 200
        };
        setting = setting || _defaultSetting;
        if (!comm.isJson(setting)) {
            setting = _defaultSetting;
        }
        setting.TYPE = setting.TYPE || _defaultSetting.TYPE;
        setting.LONG_TOUCH_TIME = setting.LONG_TOUCH_TIME || _defaultSetting.LONG_TOUCH_TIME;
        setting.DOUBLE_TOUCH_TIME = setting.DOUBLE_TOUCH_TIME || _defaultSetting.DOUBLE_TOUCH_TIME;
        this.setting = setting;
        const touchKey = new Gpio(this.no, { mode: Gpio.INPUT, alert: true });
        let down = 1;
        if (this.setting.TYPE == TOUCH_KEY_TYPE.UNLOCK_HIGHT || this.setting.TYPE == TOUCH_KEY_TYPE.LOCK_HIGHT) {
            down = 1;
        } else {
            down = 0;
        }
        let _switch = {
            touch: false,
            double: false,
            long: false,
            time: 0
        };
        let lastDownTime = new Date().valueOf();
        // let lastTime = Number.MAX_SAFE_INTEGER;
        touchKey.on('alert', (level, tick) => {
            let upTime;
            if (level == down) {
                _switch.touch = true;
                lastDownTime = new Date().valueOf();
            } else {
                _switch.touch = false;
                upTime = new Date().valueOf();
                // if (lastTime == Number.MAX_SAFE_INTEGER) {
                //     lastTime = upTime - lastDownTime;
                // } else {
                //     lastTime += (upTime - lastDownTime);
                // }
            }
            _switch.time = upTime - lastDownTime;
            _switch.time = comm.isNumber(_switch.time) ? _switch.time : 0;
            if (_switch.time >= this.setting.LONG_TOUCH_TIME) {
                _switch.long = true;
            } else {
                _switch.long = false;
            }
            // if (lastTime <= this.setting.DOUBLE_TOUCH_TIME) {
            //     _switch.double = true;
            // } else {
            //     _switch.double = false;
            // }
            this.key.emit('touch', _switch);
            // _switch.double = false;
            // lastTime = Number.MAX_SAFE_INTEGER;
        });
    }
}

module.exports = TOUCH_KEY;