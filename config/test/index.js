var webpackConfig = require('./webpack')

var config = {
  env: '"production"',
  assetsSubDirectory: 'static',
  // assetsPublicPath: 'https://cdn.yonyoucloud.com/',
  assetsPublicPath: 'http://s4ofo45k.9194af05-6466-4f8c-8c41-40768e0ee4f5.app.yyuap.com/',

  productionSourceMap: true,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  gzip: false,
  gzipExtensions: ['js', 'css'],
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
}

config.webpackConfig = webpackConfig(config)

module.exports = config