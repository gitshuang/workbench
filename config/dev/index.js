const proxyTable = require('../proxy');
const webpackConfig = require('../webpack.dev');

const config = {
  env: '"development"',
  host: '""',
  localhost: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable,
  autoOpenBrowser: false,
  port: 3000,
};

config.webpackConfig = webpackConfig(config);

module.exports = config;
