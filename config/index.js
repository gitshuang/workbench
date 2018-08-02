var build = require('./prod')
var dev = require('./dev')
var test = require('./test')
var formal = require('./formal')
var daily = require('./daily');
var configs = {
  build: build,
  dev: dev,
  test: test,
  formal: formal,
  daily:daily,
}

module.exports = function (key) {
  var config = configs[key];
  process.env.NODE_ENV = JSON.parse(config.env)
  return config;
}
