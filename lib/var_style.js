/*!
 * var-style - lib/var-style.js 
 * Author: dead-horse <dead_horse@qq.com>
 */

var DEFAULT_TO_SNAKE_REG = /[A-Z]|(\d+)[a-z]/g;
var toSnake = exports.toSnake = function (key, reg) {
  return key.replace(reg || DEFAULT_TO_SNAKE_REG, function (a) {
    return '_' + a.toLowerCase();
  });
};

var DEFAULT_TO_CAMEL_REG = /_([a-z0-9])/g;
var toCamel = exports.toCamel = function (key, reg) {
  return key.replace(reg || DEFAULT_TO_CAMEL_REG, function (all, a) {
    return a.toUpperCase();
  });
};

/**
 * try to tranform from camel case to snake case
 * {
 *   sellerName: 'dead_horse',
 *   sellerId: '1234'
 * }
 * =>
 * {
 *   seller_name: 'dead_horse',
 *   seller_id: '1234'
 * }
 * @param {Object} obj
 * @return {Object} 
 */
var camelToSnake = exports.camelToSnake = function (obj, reg) {
  if (!obj || !(obj instanceof Object) || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      obj[i] = camelToSnake(obj[i], reg);
    }
    return obj;
  }

  var transformed = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    var snakeKey = toSnake(key, reg);
    transformed[snakeKey] = camelToSnake(obj[key], reg);
  }
  return transformed;
};

/**
 * try to tranform from snake case to camel case
 * @param {Object} obj
 * @return {Object} 
 */
var snakeToCamel = exports.snakeToCamel = function (obj, reg) {
  if (!(obj instanceof Object) || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      obj[i] = snakeToCamel(obj[i], reg);
    }
    return obj;
  }

  var transformed = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }    
    var snakeKey = toCamel(key, reg);
    transformed[snakeKey] = snakeToCamel(obj[key], reg);
  }
  return transformed;  
};
