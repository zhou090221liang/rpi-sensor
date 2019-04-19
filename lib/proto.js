/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {String} fmt 格式字符串
 * @returns
 */
Date.prototype.format = function (fmt) {
    if (!fmt) {
        fmt = "yyyy-MM-dd hh:mm:ss";
    }
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

/**
 * 格式化字符串
 * 例:var str = "您的订单{0}已经提交成功，预计{1}送达";str = str.format("20150616001","06月20日");
 * @param {*} args 多个需要格式化的参数值
 * @returns
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/**
 * 原型函数 获取字符串字节长度
 * @returns
 */
String.prototype.getByteLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

/**
 * 原型函数 去除前后空格
 * @returns
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 原型函数 去除前面的空格
 * @returns
 */
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}

/**
 * 原型函数 去除后面的空格
 * @returns
 */
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

/**
 * 原型函数 字符串结尾是否包含指定字符串
 * @param {*} str
 * @returns
 */
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
}

/**
 * 原型函数 字符串开头是否包含指定字符串
 * @param {*} str
 * @returns
 */
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
}

function checkChineseCitizenIdCardNumber(idcard) {
    if (!idcard) {
        return { errcode: 1, errmsg: '身份证号码位数不对' };
    }
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "xingjiang",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }
    var Y, JYM, ereg;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null)
        return { errcode: 4, errmsg: '身份证地区非法' };
    //身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard))
                return { errcode: 0, errmsg: '成功' };
            else
                return { errcode: 2, errmsg: '身份证号码出生日期超出范围或含有非法字符' };
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) { //测试出生日期的合法性
                //计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
                    (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
                    (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
                    (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
                    (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
                    (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
                    (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
                    parseInt(idcard_array[7]) * 1 +
                    parseInt(idcard_array[8]) * 6 +
                    parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1); //判断校验位
                if (M == idcard_array[17])
                    return { errcode: 0, errmsg: '成功' }; //检测ID的校验位
                else
                    return { errcode: 3, errmsg: '身份证号码校验位错误' };
            } else
                return { errcode: 2, errmsg: '身份证号码出生日期超出范围或含有非法字符' };
        default:
            return { errcode: 1, errmsg: '身份证号码位数不对' };
    }
}

/**
 * 是否中国公民身份证号码
 */
String.prototype.isChineseCitizenIdCardNumber = function () {
    let r = checkChineseCitizenIdCardNumber(this);
    return r.errcode == 0;
}

/**
 * 是否中国手机号码
 * @returns
 */
String.prototype.isChineseCellphone = function () {
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(this)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否邮箱地址
 * @returns
 */
String.prototype.isEmailAddress = function () {
    let pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否QQ号码
 * @returns
 */
String.prototype.isQqNumber = function () {
    let pattern = /^[0-9]{5,10}$/;
    if (!pattern.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否MD5
 * @returns
 */
String.prototype.isMd5 = function () {
    let pattern1 = /^([a-fA-F0-9]{32})$/;
    let pattern2 = /^([a-fA-F0-9]{16})$/;
    if (!pattern1.test(this) && !pattern2.test(this)) {
        return false;
    }
    return true;
}

/**
 * 是否URL
 * @returns
 */
String.prototype.isUrl = function () {
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if (reg.test(this))
        return true;
    return false;
}

/**
 * 是否Guid
 * @returns
 */
String.prototype.isGuid = function () {
    let reg = /^[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$/;
    if (reg.test(this))
        return true;
    reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (reg.test(this))
        return true;
    reg = /^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/;
    if (reg.test(this))
        return true;
    return false;
};

/**
 * 转Base64
 * @returns
 */
String.prototype.toBase64 = function () {
    return new Buffer(this).toString('base64');
};

/**
 * 解Base64
 * @returns
 */
String.prototype.fromBase64 = function () {
    return new Buffer(this, 'base64').toString();
};

/**
 * GBK转UTF8
 * @returns
 */
String.prototype.fromGbk = function () {
    return unescape(this.replace(/&#x/g, '%u').replace(/;/g, ''));
};

/**
 * 获取字符串字节长度
 * @returns
 */
String.prototype.byteLength = function () {
    return Buffer.from(this).length;
};

/**
 * 下划线转换驼峰
 * @returns
 */
String.prototype.toHump = function () {
    return this.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
};
/**
 * 驼峰转换下划线
 * @returns
 */
String.prototype.toLine = function () {
    return this.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 在数组的指定位置插入元素
 * @param {*} index
 * @param {*} item
 */
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};