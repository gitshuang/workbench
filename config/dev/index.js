var proxyTable = require('../proxy')
var webpackConfig = require('./webpack')

var config = {
  env: '"development"',
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  proxyTable: proxyTable,
  autoOpenBrowser: false,
  port: 3000,
}

config.webpackConfig = webpackConfig(config)

module.exports = config
