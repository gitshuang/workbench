var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

var paths = {
  src: resolve('src/'),
  dist: resolve('dist/'),
  assets: resolve('src/assets/'),
  containers: resolve('src/containers/'),
  public: resolve('src/public/'),
  api: resolve('src/api/'),
  components: resolve('src/components/'),
  router: resolve('src/router/'),
  store: resolve('src/store/'),
  utils: resolve('src/public/utils.js'),
}

module.exports = function (key) {
  return paths[key] || paths.src;
}
