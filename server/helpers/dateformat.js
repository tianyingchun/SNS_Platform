/**
 * 用法：第一个参数传一个Date对象（没有则使用当前时间），第二个参数是格式化字符串，格式如下：
　　　　YYYY：4位年,如1993
　　　　YY：2位年,如93
　　　　MM：月份
　　　　DD：日期
　　　　hh：小时
　　　　mm：分钟
　　　　ss：秒钟
　　　　星期：星期，返回如 星期二
　　　　周：返回如 周二
　　　　week：英文星期全称，返回如 Saturday
　　　　www：三位英文星期，返回如 Sat
　　示例：
 * formatDate(new Date("january 01,2012"));
 * formatDate(new Date());
 * formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD YY年 week');
 * formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期/周 www YYYY/MM/DD week');
 * @param  {[type]} date   [description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
function formatDate(date, format) {
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
module.exports = formatDate;
