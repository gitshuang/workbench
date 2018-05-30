var webpackConfig = require('./webpack')
// 不再使用dist 而是使用zh_CN 和 en_US
var outPut =  process.argv.length < 3 ? 'zh_CN' : `en_US`;
var config = {
  env: '"development"',
  host: '""',
  assetsSubDirectory: 'static',
  // assetsPublicPath: 'https://cdn.yonyoucloud.com/',
  assetsPublicPath: `http://workbenchdev.yyuap.com/fe/${outPut}`,

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
