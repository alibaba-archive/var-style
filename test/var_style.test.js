/*!
 * var-style - test/var-style.test.js 
 * Author: dead-horse <dead_horse@qq.com>
 */

/**
 * Module dependencies.
 */
var transformer = require('../lib/var_style');
var should = require('should');

describe('lib/var_style.js', function () {
  describe('camelToSnake()', function () {
    it('should transform ignore', function () {
      transformer.camelToSnake(1).should.equal(1);
      transformer.camelToSnake(true).should.equal(true);
      should.not.exist(transformer.camelToSnake(null));
      transformer.camelToSnake('').should.equal('');
      transformer.camelToSnake('string test').should.equal('string test');
      var now = new Date();
      transformer.camelToSnake(now).should.equal(now);
    });

    it('should transform ok', function () {
      transformer.camelToSnake({testData: [1, 2, 3]}).should.eql({test_data: [1, 2, 3]});
      transformer.camelToSnake({testData: {secondLevel: 1}}).should.eql({test_data: {second_level: 1}});
      transformer.camelToSnake({
        testData: [{arrayData: 1}, {array_data: 2}, {arrayData: {thirdLevelInArray: 1} } ] 
      }).should.eql({
        test_data: [{array_data: 1}, {array_data: 2}, {array_data: {third_level_in_array : 1} } ]
      });
      function customToSnake(key, reg) {
        return key.replace(/[A-Z][a-z]/g, function (a) {
          return '_' + a.toLowerCase();
        });
      }
      transformer.camelToSnake({testData: {secondLevel: 1}}, customToSnake).should.eql({test_data: {second_level: 1}});
    });
  });

  describe('snakeToCamel()', function () {
    it('should transform ignore', function () {
      transformer.snakeToCamel(1).should.equal(1);
      transformer.snakeToCamel(true).should.equal(true);
      should.not.exist(transformer.snakeToCamel(null));
      transformer.snakeToCamel('').should.equal('');
      transformer.snakeToCamel('string test').should.equal('string test');
      var now = new Date();
      transformer.snakeToCamel(now).should.equal(now);      
    });

    it('should transform ok', function () {
      transformer.snakeToCamel({test_data: [1, 2, 3]}).should.eql({testData: [1, 2, 3]});
      transformer.snakeToCamel({test_data: {second_level: 1}}).should.eql({testData: {secondLevel: 1}});
      transformer.snakeToCamel({
        test_data: [{array_data: 1}, {arrayData: 2}, {array_data: {third_level_in_array : 1} } ]
      }).should.eql({
        testData: [{arrayData: 1}, {arrayData: 2}, {arrayData: {thirdLevelInArray: 1} } ] 
      });
      function customToCamel(key, reg) {
        return key.replace(/_([a-z])/g, function (all, a) {
          return a.toUpperCase();
        });
      };
      transformer.snakeToCamel({test_data: {second_level: 1}}, customToCamel).should.eql({testData: {secondLevel: 1}});
    });    
  });

  describe('toSnake()', function () {
    it('should transform ok', function () {
      transformer.toSnake('userName').should.equal('user_name');
      transformer.toSnake('buy1d').should.equal('buy_1d');
      transformer.toSnake('foo1').should.equal('foo1');
      transformer.toSnake('cat1Main').should.equal('cat1_main');
    });
  });

  describe('toCamel()', function () {
    it('should transform ok', function () {
      transformer.toCamel('user_name').should.equal('userName');
      transformer.toCamel('buy_1d').should.equal('buy1d');
      transformer.toCamel('foo1').should.equal('foo1');
      transformer.toCamel('cat1_main').should.equal('cat1Main');
    });
  });  
});
