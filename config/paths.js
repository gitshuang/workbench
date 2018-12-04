var path = require('path')
var goalFilePath = require('./goalFilePath');
var outPut = require('./outPut');

function resolve(dir) {
  return path.join(__dirname, `../${goalFilePath}/workbench/pc/`, dir)
}

var paths = {
  src: resolve(''),
  assets: resolve('assets'),
  components: resolve('components'),
  containers: resolve('containers'),
  pages: resolve('pages'),
  public: resolve('public'),
  router: resolve('router'),
  store: resolve('store'),
  yutils: resolve('utils'),
  static: path.join(__dirname, '../static'),
  node: path.join(__dirname, '../node_modules'),
  // api: resolve('api'),
  // utils: resolve('public/utils.js'),
  // dist: path.join(__dirname, '../dist'), // 因为要生成多个dist（中文，英文的 ）
  // bee: resolve('bee'),
}
paths[outPut] = path.join(__dirname, `../${outPut}`);
module.exports = function (key) {
  return paths[key] || paths.src;
}
