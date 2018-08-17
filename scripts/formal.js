require('./check-versions')()

var fs = require('fs')
var path = require('path')
var ora = require('ora')
var rm = require('rimraf')
var chalk = require('chalk')
var webpack = require('webpack')
var ejs = require('ejs')
var spinner = ora('building for production...')

var config = require('../config')('formal')
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

    spinner = ora('make html files...')
    spinner.start()

    var namedChunks = stats.compilation.namedChunks;
    var options = stats.compilation.options;
    //这边修改一下，因为dist被zh_CN zh_TW en_US取代了
    //var htmlDir = path.join(__dirname, '..', 'dist')
    var reg = /^LAN_TYPE\=/g;
    var outPut ;
    switch (process.argv[2].replace(reg,'')) {
      case "src":
        outPut='zh_CN';
        break;
      case "en":
        outPut='en_US';
        break;
      case "tw":
        outPut='zh_TW';
        break;
      default:
        outPut='zh_CN';
        break;
    }
    var htmlDir = path.join(__dirname, '..', outPut)
    Object.keys(webpackConfig.entry).forEach(function(entry){
      var templatePath = path.join(__dirname, '..', 'template', `${entry}.ejs`)
      var defaultTemplatePath = path.join(__dirname, '..', 'template', 'default.ejs')
      var template = '';
      if (fs.existsSync(templatePath)) {
        template = templatePath
      } else if (fs.existsSync(defaultTemplatePath)) {
        template = defaultTemplatePath
      }
      template = fs.readFileSync(template, 'utf8')
      try {
        if (!fs.existsSync(htmlDir)) {
          fs.mkdirSync(htmlDir);
        }
        fs.writeFileSync(
          path.join(htmlDir, 'index.html'),
          ejs.render(template, {
            publicPath: options.output.publicPath,
            entry: entry,
            indexJs: namedChunks[entry].files[0],
            indexCss: namedChunks[entry].files[1],
            manifest: namedChunks['manifest'].files[0],
            vendor: namedChunks['vendor'].files[0],
            polyfill: namedChunks['polyfill'].files[0],
          })
        );
      } catch (e) {
        console.log(chalk.red(e.message))
        console.log(chalk.red(e.stack))
      }
    })
    spinner.stop()
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
