var path = require('path')
var projectId = '29035'
var api = [
  '/service/getAllServicesGroupByLabels',//废弃
  '/service/getAllServicesByLabelGroup',
  '/application/getAllAppsbyLabelGroup',
  '/application/getShortcutApps',
  '/desktop/getdeskTop',
  '/service/getServiceInfoByServiceCode',
  '/service/getServiceInfoByAppCode',
  '/service/getAllAppsGroupByLabels',//废弃

  '/user/setCutUser',
  '/user/getUserInfo',
  
  '/getMessage',
  '/getSelectWidgetList',
  '/setManageList',
  '/getManageList',
  '/getLatestAccess',
  '/getPromotionService',

  '/fullText/suggest',
  '/fullText/getMore',
  '/fullText/search',
  '/fullText/getOther',
  '/getInvitationUrl',

  '/invite/getInviteUsersJoinAddress',
  '/invite/sendMessage',
  '/invite/getQRCode',

  '/manager/teamEnter/createEnter',
  '/manager/enter/info',
  '/manager/application/getAllAppsForTeam',
  '/manager/team/info',
  '/manager/team/queryUserPage',
]

var rapApi = [
    // '/service/getAllServicesGroupByLabels'
  // '/user/getUserInfo',
  '/widget/deleteByServiceCode',
  '/widget/create',
  '/service/getServiceInfoWithDetail',
  '/widget/getFolders',
  '/desktop/update',
];

function makeRapConfig(key) {
  var config = {
    target: 'http://rap.taobao.org/',
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
