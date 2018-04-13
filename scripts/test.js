require('./check-versions')()

var fs = require('fs')
var path = require('path')
var ora = require('ora')
var rm = require('rimraf')
var chalk = require('chalk')
var webpack = require('webpack')
var ejs = require('ejs')
var spinner = ora('building for production...')

var config = require('../config')('test')
var webpackConfig = config.webpackConfig
var assetsRoot = webpackConfig.output.path

spinner.start()

rm(assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    spinner.stop()
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
