const proxyTable = require('../proxy');
const webpackConfig = require('./webpack');

const config = {
  env: '"development"',
  host: '""',
  localhost: false,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable,
  autoOpenBrowser: false,
  port: 3000,
};

config.webpackConfig = webpackConfig(config);

module.exports = config;
