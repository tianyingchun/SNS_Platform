var _ = require('lodash');

module.exports = {
  /**
   * create enum datatype.
   * @param  {Array} values ['Administrator', 'Guests', 'Partner']
   * @return {Object}
   */
  createEnum: function (values) {
    var Enum = {},
      values = values || [];
    values.forEach(function (item, index) {
      Enum[Enum[item] = index] = item;
    });
    return Enum;
  },
  /**
   *  format string e.g  stringFormat("my name is {0}, sex is: {1}","tian","male")
   * @param  {array like} str the source string that will be replace by regex .
   */
  stringFormat: function() {
    // use this string as the format,Note {x},x start from 1,2,3
    // walk through each argument passed in
    for (var fmt = arguments[0], ndx = 1; ndx < arguments.length; ++ndx) {
      // replace {1} with argument[1], {2} with argument[2], etc.
      var argVal = _.isObject(arguments[ndx]) ? JSON.stringify(arguments[ndx]) : arguments[ndx];
      fmt = fmt.replace(new RegExp('\\{' + (ndx - 1) + '\\}', "g"), argVal);
    }
    // return the formatted string
    return fmt;
  },
  /**
   * 用法：
   *   第一个参数传一个Date对象（没有则使用当前时间）
   *   第二个参数是格式化字符串，格式如下：
   *　　YYYY：4位年,如1993
   *　　YY：2位年,如93
   *　　MM：月份
   *　　DD：日期
   *　　hh：小时
   *　　mm：分钟
   *　　ss：秒钟
   *　　星期：星期，返回如 星期二
   *　　周：返回如 周二
   *　　week：英文星期全称，返回如 Saturday
   *　　www：三位英文星期，返回如 Sat
   * 示例：
   * formatDate(new Date("january 01,2012"));
   * formatDate(new Date());
   * formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD YY年 week');
   * formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期/周 www YYYY/MM/DD week');
   * @param  {[type]} date   [description]
   * @param  {[type]} format [description]
   * @return {[type]}        [description]
   */
  formatDate: function (date, format) {

    function Appendzero(obj) {
      if (obj < 10) return "0" + "" + obj;
      else return obj;
    }
    if (arguments.length < 2 && !date.getTime) {
      format = date;
      date = new Date();
    }
    typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function (a) {
      switch (a) {
        case "YYYY":
          return date.getFullYear();
        case "YY":
          return (date.getFullYear() + "").slice(2);
        case "MM":
          return Appendzero(date.getMonth() + 1);
        case "DD":
          return Appendzero(date.getDate());
        case "hh":
          return Appendzero(date.getHours());
        case "mm":
          return Appendzero(date.getMinutes());
        case "ss":
          return Appendzero(date.getSeconds());
        case "星期":
          return "星期" + week[date.getDay() + 7];
        case "周":
          return "周" + week[date.getDay() + 7];
        case "week":
          return week[date.getDay()];
        case "www":
          return week[date.getDay()].slice(0, 3);
      }
    });
  }

};
