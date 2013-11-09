
# var-style ![var-style](https://api.travis-ci.org/dead-horse/var-style.png)  

  Transform variable style between camel case and snake case.

  In node world, all our node code are camel case style. But sometimes, our rest api params or other api params are snake case style. So we need a transformer.  

## Usage  

```js
var transformer = require('var-style');

//transform input as key
transformer.toSnake('userName').should.equal('user_name');
transformer.toCamel('user_name').should.equal('userName');

//tranform input as object
transformer.camelToSnake({testData: [1, 2, 3]}).should.eql({test_data: [1, 2, 3]});
transformer.snakeToCamel({test_data: {second_level: 1}}).should.eql({testData: {secondLevel: 1}});

//You can use your own tranformer function 
function customToCamel(key, reg) {
  return key.replace(/_([a-z])/g, function (all, a) {
    return a.toUpperCase();
  });
};
transformer.snakeToCamel({test_data: {second_level: 1}}, customToCamel).should.eql({testData: {secondLevel: 1}});

function customToSnake(key, reg) {
  return key.replace(/[A-Z][a-z]/g, function (a) {
    return '_' + a.toLowerCase();
  });
}
transformer.camelToSnake({testData: {secondLevel: 1}}, customToSnake).should.eql({test_data: {second_level: 1}});
```

## License  
`MIT`
