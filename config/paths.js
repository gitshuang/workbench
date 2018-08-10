var path = require('path')

var reg = /^LAN_TYPE\=/g;
var goalFilePath = process.argv.length < 3? 'src' : process.argv[2].replace(reg,'');
// 不再使用dist 而是使用zh_CN 和 en_US
var outPut 
switch (process.argv[2].replace(reg,'')) {
  case "src":
    outPut='zh_CN'
    break;
  case "en":
    outPut='en_US'
    break;
  case "tw":
    outPut='zh_TW'
    break;
  default:
    outPut='zh_CN'
    break;
}
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
  //dist: path.join(__dirname, '../dist'), // 因为要生成多个dist（中文，英文的 ）
  bee: resolve('bee'),
  node: path.join(__dirname, '../node_modules'),
}
paths[outPut] =  path.join(__dirname, `../${outPut}`);
module.exports = function (key) {
  return paths[key] || paths.src;
}
