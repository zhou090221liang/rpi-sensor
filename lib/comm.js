require('./proto');

/**
 * 是否JSON对象
 * @returns
 */
const isJson = (obj) => {
    for (let key in obj) {
        r = isJsonOrJsonArray(obj[key]) || isString(obj[key]);
        if (!r)
            return false;
    }
    return true;
};
exports.isJson = isJson;

/**
 * 是否数组对象
 * @returns
 */
const isArray = (obj) => {
    return obj instanceof Array;
};
exports.isArray = isArray;

/**
 * 是否JSON对象数组
 * @returns
 */
const isJsonArray = (obj) => {
    if (isArray(obj)) {
        for (let o of obj) {
            if (!isJson(obj) && !isJsonArray(obj)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};
exports.isJsonArray = isJsonArray;

/** 
 * 是否JSON对象或JSON对象数组
 * @returns
*/
const isJsonOrJsonArray = (obj) => {
    return isJson(obj) || isJsonArray(obj);
};
exports.isJsonOrJsonArray = isJsonOrJsonArray;

/**
 * 是否Object对象
 * @returns
 */
const isObject = (obj) => {
    return obj instanceof Object;
};
exports.isObject = isObject;

/**
 * 是否是Error对象
 * @returns
 */
const isError = (obj) => {
    return obj instanceof Error;
};
exports.isError = isError;

/**
 * 是否是字符串
 * @returns
 */
const isString = (obj) => {
    return typeof obj == 'string';
};
exports.isString = isString;

/**
 * 是否是数字
 * @returns
 */
const isNumber = (obj) => {
    return !isNaN(obj.toString());
};
exports.isNumber = isNumber;

/**
 * 是否Date类型
 * @returns
 */
const isDate = (obj) => {
    return obj instanceof Date;
};
exports.isDate = isDate;

/** 
 * 物理编号和逻辑编号对应表
*/
const GPIO_MAPPING = {
    "1": {
        "PhysicalNumber": 1,
        "Name": "3.3V",
        "wPin": null,
        "BCM": null,
        "Type": "VCC"
    },
    "2": {
        "PhysicalNumber": 2,
        "Name": "5V",
        "wPin": null,
        "BCM": null,
        "Type": "VCC"
    },
    "3": {
        "PhysicalNumber": 3,
        "Name": "SDA.1",
        "wPin": 8,
        "BCM": 2,
        "Type": "I2C"
    },
    "4": {
        "PhysicalNumber": 4,
        "Name": "5V",
        "wPin": null,
        "BCM": null,
        "Type": "VCC"
    },
    "5": {
        "PhysicalNumber": 5,
        "Name": "SCL.1",
        "wPin": 9,
        "BCM": 3,
        "Type": "I2C"
    },
    "6": {
        "PhysicalNumber": 6,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "7": {
        "PhysicalNumber": 7,
        "Name": "GPIO.7",
        "wPin": 7,
        "BCM": 4,
        "Type": "GPIO"
    },
    "8": {
        "PhysicalNumber": 8,
        "Name": "TxD",
        "wPin": 15,
        "BCM": 14,
        "Type": "UART"
    },
    "9": {
        "PhysicalNumber": 9,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "10": {
        "PhysicalNumber": 10,
        "Name": "RxD",
        "wPin": 16,
        "BCM": 15,
        "Type": "UART"
    },
    "11": {
        "PhysicalNumber": 11,
        "Name": "GPIO.0",
        "wPin": 0,
        "BCM": 17,
        "Type": "GPIO"
    },
    "12": {
        "PhysicalNumber": 12,
        "Name": "GPIO.1",
        "wPin": 1,
        "BCM": 18,
        "Type": "GPIO"
    },
    "13": {
        "PhysicalNumber": 13,
        "Name": "GPIO.2",
        "wPin": 2,
        "BCM": 27,
        "Type": "GPIO"
    },
    "14": {
        "PhysicalNumber": 14,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "15": {
        "PhysicalNumber": 15,
        "Name": "GPIO.3",
        "wPin": 3,
        "BCM": 22,
        "Type": "GPIO"
    },
    "16": {
        "PhysicalNumber": 16,
        "Name": "GPIO.4",
        "wPin": 4,
        "BCM": 23,
        "Type": "GPIO"
    },
    "17": {
        "PhysicalNumber": 17,
        "Name": "3.3V",
        "wPin": null,
        "BCM": null,
        "Type": "VCC"
    },
    "18": {
        "PhysicalNumber": 18,
        "Name": "GPIO.5",
        "wPin": 5,
        "BCM": 24,
        "Type": "GPIO"
    },
    "19": {
        "PhysicalNumber": 19,
        "Name": "MOSI",
        "wPin": 12,
        "BCM": 10,
        "Type": "SPI"
    },
    "20": {
        "PhysicalNumber": 20,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "21": {
        "PhysicalNumber": 21,
        "Name": "MISO",
        "wPin": 13,
        "BCM": 9,
        "Type": "SPI"
    },
    "22": {
        "PhysicalNumber": 22,
        "Name": "GPIO.6",
        "wPin": 6,
        "BCM": 25,
        "Type": "GPIO"
    },
    "23": {
        "PhysicalNumber": 23,
        "Name": "SCLK",
        "wPin": 14,
        "BCM": 11,
        "Type": "SPI"
    },
    "24": {
        "PhysicalNumber": 24,
        "Name": "CE0",
        "wPin": 10,
        "BCM": 8,
        "Type": "SPI"
    },
    "25": {
        "PhysicalNumber": 25,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "26": {
        "PhysicalNumber": 26,
        "Name": "CE1",
        "wPin": 11,
        "BCM": 7,
        "Type": "SPI"
    },
    "27": {
        "PhysicalNumber": 27,
        "Name": "SDA.0",
        "wPin": 30,
        "BCM": 0,
        "Type": "I2C"
    },
    "28": {
        "PhysicalNumber": 28,
        "Name": "SCL.0",
        "wPin": 31,
        "BCM": 1,
        "Type": "I2C"
    },
    "29": {
        "PhysicalNumber": 29,
        "Name": "GPIO.21",
        "wPin": 21,
        "BCM": 5,
        "Type": "GPIO"
    },
    "30": {
        "PhysicalNumber": 30,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "31": {
        "PhysicalNumber": 31,
        "Name": "GPIO.22",
        "wPin": 22,
        "BCM": 6,
        "Type": "GPIO"
    },
    "32": {
        "PhysicalNumber": 32,
        "Name": "GPIO.26",
        "wPin": 26,
        "BCM": 12,
        "Type": "GPIO"
    },
    "33": {
        "PhysicalNumber": 33,
        "Name": "GPIO.23",
        "wPin": 23,
        "BCM": 13,
        "Type": "GPIO"
    },
    "34": {
        "PhysicalNumber": 34,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "35": {
        "PhysicalNumber": 35,
        "Name": "GPIO.24",
        "wPin": 24,
        "BCM": 19,
        "Type": "GPIO"
    },
    "36": {
        "PhysicalNumber": 36,
        "Name": "GPIO.27",
        "wPin": 27,
        "BCM": 16,
        "Type": "GPIO"
    },
    "37": {
        "PhysicalNumber": 37,
        "Name": "GPIO.25",
        "wPin": 25,
        "BCM": 26,
        "Type": "GPIO"
    },
    "38": {
        "PhysicalNumber": 38,
        "Name": "GPIO.28",
        "wPin": 28,
        "BCM": 20,
        "Type": "GPIO"
    },
    "39": {
        "PhysicalNumber": 39,
        "Name": "0V",
        "wPin": null,
        "BCM": null,
        "Type": "GND"
    },
    "40": {
        "PhysicalNumber": 40,
        "Name": "GPIO.29",
        "wPin": 29,
        "BCM": 21,
        "Type": "GPIO"
    }
};
exports.GPIO_MAPPING = GPIO_MAPPING;