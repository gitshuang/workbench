var path = require('path')
var projectId = '27469'
var api = [
  '/getProductList',
  '/getUserInfo',
  '/getWidgetList',
  '/getServiceList',
  '/getMessage',
  '/getProductInfo',
  '/getWorkList',
  '/getTitleService',
  '/setPinCancel',
]

function makeRapConfig(key) {
  var config = {
    target: 'http://rapapi.org',
    changeOrigin: true,
    pathRewrite: {}
  };
  config.pathRewrite['^' + key] = '/mockjsdata/' + projectId + key
  return config
}

function makeStaticConfig(key) {
  var config = {
    target: 'http://localhost:3000',
    pathRewrite: {}
  };
  config.pathRewrite['^' + key] = '/static' + key + '.json'
  return config
}

function addApi() {
  var obj = {};
  var options = Array.prototype.slice.call(arguments, 0);
  options.forEach(function(options) {
    var makeConfig = options[0]
    var apis = options[1]
    apis.forEach(function(api) {
      obj[api] = makeConfig(api)
    })
  })
  return obj;
}

module.exports = addApi([makeStaticConfig, api])
