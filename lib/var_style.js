/*!
 * var-style - lib/var-style.js 
 * Author: dead-horse <dead_horse@qq.com>
 */

var toSnake = exports.toSnake = function (key) {
  return key.replace(/[A-Z]|(\d+)[a-z]/g, function (a) {
    return '_' + a.toLowerCase();
  });
};

var toCamel = exports.toCamel = function (key) {
  return key.replace(/_([a-z0-9])/g, function (all, a) {
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
 * @param {Function} transform, default is toSnake
 * @return {Object} 
 */
var camelToSnake = exports.camelToSnake = function (obj, transform) {
  if (!obj || !(obj instanceof Object) || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      obj[i] = camelToSnake(obj[i], transform);
    }
    return obj;
  }

  var transformed = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    var snakeKey = transform ? transform(key) : toSnake(key);
    transformed[snakeKey] = camelToSnake(obj[key], transform);
  }
  return transformed;
};

/**
 * try to tranform from snake case to camel case
 * @param {Object} obj
 * @param {Function} transform, default is toCamel
 * @return {Object} 
 */
var snakeToCamel = exports.snakeToCamel = function (obj, transform) {
  if (!(obj instanceof Object) || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      obj[i] = snakeToCamel(obj[i], transform);
    }
    return obj;
  }

  var transformed = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }    
    var snakeKey = transform ? transform(key) : toCamel(key);
    transformed[snakeKey] = snakeToCamel(obj[key], transform);
  }
  return transformed;  
};
