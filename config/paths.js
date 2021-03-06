var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../src/workbench/pc/', dir)
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

module.exports = function (key) {
  return paths[key] || paths.src;
}
