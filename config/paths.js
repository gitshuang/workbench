var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

var paths = {
  src: resolve('src/'),
  dist: resolve('dist/')
}

module.exports = function (key) {
  return paths[key] || paths.src;
}
