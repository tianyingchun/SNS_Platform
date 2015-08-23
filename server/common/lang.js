var _ = require('lodash');
var util = require('util');
var debug = require('debug')('app:lang');
module.exports = {
  /**
   * @example()
   * var NotFoundError = createError('NotFoundError', {status:404})
   * var err = new NotFoundError('ohnoes')
   * err
   * //-> NotFoundError {}
   * err instanceof NotFoundError
   * //-> true
   * err instanceof Error
   * //-> true
   * err.name === 'NotFoundError'
   * //-> true
   * err.message
   * //-> 'ohnoes'
   * err.status
   * //-> 404
   * Create customized Error constructor
   * @param  {String} name   the error class name()
   * @param  {Function} parent optional default is Error class.
   * @param  {Object} opts    the extend data will merged to
   * @return {Function}        The new ErrorClass.
   */
  createError: function (name, parent, opts) {
    if (_.isUndefined(opts) && !_.isFunction(parent)) {
      opts = parent;
      parent = undefined;
    }

    parent = parent || Error;
    opts = opts || {};

    /**
     * The error constructor
     * @param  {String}   code    the code
     * @param  {String}   message the message
     */
    function fn(code, message) {

      parent.apply(this, arguments);

      if (false !== opts.stack) {
        Error.captureStackTrace(this, this.constructor);
      }
      // merge initial properties.
      _.extend(this, opts);

      this.code = code;
      this.message = message;
    }

    var body = 'return function ' + name + '(){fn.apply(this, arguments)}';
    var err = new Function('fn', body)(fn);

    // inherites parentError || Error
    util.inherits(err, parent);

    _.extend(err.prototype, {
      name: name,
      setStatus: function (status) {
        this.status = status;
        return this;
      }
    });
    return err;
  },
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
  stringFormat: function () {
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

  mixinScopes: function (scope) {
    var _scope = ['defaultScope'];
    if (_.isArray(scope)) {
      _scope = _scope.concat(scope);
    } else if (_.isString(scope)) {
      _scope.push(scope);
    }
    debug('_mixinScopes: ', _scope);
    return _scope;
  },

  serialize: function (data) {
    // simply use JSON.stringify.
    return JSON.stringify(data);
  },
  // serialize data.
  deSerialize: function (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      var Error = createError('LangError', {
        status: 400
      });
      throw new Error('COMMON.DE_SERIALIZE_FAILED');
    }
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
