var path = require('path')
var projectId = '29035'
var api = [
  '/serve/getAllServesGroupByLabels',
  '/application/getAllApps',
  '/desktop/getdeskTop',
  '/widget/deleteByServeCode',
  '/widget/create',
  '/widget/getFolders',
  '/serve/getServeInfoByServeCode',
  '/serve/getServeInfoByAppCode',
  '/serve/getRelationServesAndUsers',
  '/user/getUserInfo',
  '/user/setCutUser',

  '/getMessage',
  '/getSelectWidgetList',
  '/setManageList',
  '/getManageList',
]

var rapApi = [
    // '/serve/getAllServesGroupByLabels'
];

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
    target: 'http://localhost:3000/static',
    pathRewrite: function(path, req) {
      return key + '.json';
    }
  };
  // config.pathRewrite['^' + key] = '/static' + key + '.json'
  return config;
  // return 'http://localhost:3000/static' + key + '.json'
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

module.exports = addApi([makeStaticConfig, api],[makeRapConfig,rapApi])
