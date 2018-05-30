var path = require('path')

var reg = /^LAN_TYPE\=/g;
var goalFilePath = process.argv.length < 3? 'src' : process.argv[2].replace(reg,'');
// 不再使用dist 而是使用zh_CN 和 en_US
var outPut =  process.argv.length < 3 ? 'zh_CN' : `en_US`;
function resolve (dir) {
  return path.join(__dirname, `../${goalFilePath}/workbench/pc/`, dir)
}

var paths = {
  src: resolve(''),
  assets: resolve('assets'),
  containers: resolve('containers'),
  public: resolve('public'),
  pages: resolve('pages'),
  api: resolve('api'),
  components: resolve('components'),
  router: resolve('router'),
  store: resolve('store'),
  utils: resolve('public/utils.js'),
  static: path.join(__dirname, '../static'),
  dist: path.join(__dirname, '../dist'),
  bee: resolve('bee'),
  node: path.join(__dirname, '../node_modules'),
}
paths[outPut] =  path.join(__dirname, `../${outPut}`);
module.exports = function (key) {
  return paths[key] || paths.src;
}
