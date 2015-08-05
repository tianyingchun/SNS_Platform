module.exports = {
  // create enum datatype.
  createEnum: function (values) {
    var Enum = {},
      values = values || [];
    values.forEach(function (item, index) {
      Enum[Enum[item] = index] = item;
    });
    return Enum;
  }
}
