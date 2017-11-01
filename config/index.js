var build = require('./prod')
var dev = require('./dev')
var configs = {
  build: build,
  dev: dev
}

module.exports = function (key) {
  var config = configs[key];
  process.env.NODE_ENV = JSON.parse(config.env)
  return config;
}