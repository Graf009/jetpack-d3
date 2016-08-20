var _this = this;

export var get = function get() {
  for (var _len = arguments.length, iteratee = Array(_len), _key = 0; _key < _len; _key++) {
    iteratee[_key] = arguments[_key];
  }

  // convert all string arguments into field accessors
  var functions = iteratee.map(function (funct) {
    return typeof funct !== 'function' ? function (d) {
      return d[funct];
    } : funct;
  });

  // return composition of functions
  return function (d) {
    functions.forEach(function (funct) {
      d = funct.call(_this, d);
    });
    return d;
  };
};

export var defValue = function defValue(value) {
  return function (d) {
    return d || value;
  };
};

export var concat = function concat(key1, key2) {
  return function (d) {
    var value1 = get(key1)(d);
    var value2 = get(key2)(d) || '';

    return value1 ? value1 + value2 : value1;
  };
};