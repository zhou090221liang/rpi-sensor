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
            LONG_TOUCH_TIME: 500
        };
        setting = setting || _defaultSetting;
        if (!comm.isJson(setting)) {
            setting = _defaultSetting;
        }
        setting.TYPE = setting.TYPE || _defaultSetting.TYPE;
        setting.LONG_TOUCH_TIME = setting.LONG_TOUCH_TIME || _defaultSetting.LONG_TOUCH_TIME;
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
            long: false,
            time: 0
        };
        let lastDownTime = new Date().valueOf();
        touchKey.on('alert', (level, tick) => {
            let upTime;
            if (level == down) {
                _switch.touch = true;
                lastDownTime = new Date().valueOf();
            } else {
                _switch.touch = false;
                upTime = new Date().valueOf();
            }
            _switch.time = upTime - lastDownTime;
            _switch.time = comm.isNumber(_switch.time) ? _switch.time : 0;
            if (_switch.time >= this.setting.LONG_TOUCH_TIME) {
                _switch.long = true;
            } else {
                _switch.long = false;
            }
            this.key.emit('touch', _switch);
        });
    }
}

class TOUCH_KEY2 {
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
        if (this.setting.TYPE != TOUCH_KEY_TYPE.UNLOCK_HIGHT && this.setting.TYPE != TOUCH_KEY_TYPE.UNLOCK_LOW) {
            throw new Error('设备类型只能是点动类型的设备才能被支持');
            return;
        }
        const touchKey = new Gpio(this.no, { mode: Gpio.INPUT, alert: true });
        let down = 1;
        if (this.setting.TYPE == TOUCH_KEY_TYPE.UNLOCK_HIGHT) {
            down = 1;
        } else {
            down = 0;
        }
        let _switch = {
            double: false,
            long: false
        };
        let output, last, upTime;
        const _that = this;
        touchKey.on('alert', (level, tick) => {
            if (level == down) {
                last = new Date().valueOf();
                if (upTime) {
                    if (upTime - last <= _that.setting.DOUBLE_TOUCH_TIME) {
                        output && clearTimeout(output);
                        last = new Date().valueOf();
                        upTime = null;
                        _switch.double = true;
                        _that.key.emit('touch', _switch);
                        _switch = {
                            double: false,
                            long: false
                        };
                    }
                }
            } else {
                upTime = new Date().valueOf();
                if (upTime - last >= _that.setting.LONG_TOUCH_TIME) {
                    _switch.long = true;
                    _that.key.emit('touch', _switch);
                    output = null;
                    last = null;
                    upTime = null;
                    _switch = {
                        double: false,
                        long: false
                    };
                } else {
                    if (!output) {
                        output = setTimeout(function () {
                            _switch = {
                                double: false,
                                long: false
                            };
                            _that.key.emit('touch', _switch);
                            output = null;
                            last = null;
                            upTime = null;
                            _switch = {
                                double: false,
                                long: false
                            };
                        }, _that.setting.DOUBLE_TOUCH_TIME + 10);
                    }
                }
            }
        });
    }
}

module.exports = {
    TOUCH_KEY_TYPE: TOUCH_KEY_TYPE,
    TOUCH_KEY: TOUCH_KEY,
    TOUCH_KEY2: TOUCH_KEY2
};