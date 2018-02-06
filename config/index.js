var build = require('./prod')
var dev = require('./dev')
var test = require('./test')
var formal = require('./formal')
var configs = {
  build: build,
  dev: dev,
  test: test,
  formal: formal,
}

module.exports = function (key) {
  var config = configs[key];
  process.env.NODE_ENV = JSON.parse(config.env)
  return config;
}
