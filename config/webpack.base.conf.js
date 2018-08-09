var paths = require('./paths')
var reg = /^LAN_TYPE\=/g;
var goalFilePath = process.argv.length < 3? 'src' : process.argv[2].replace(reg,'');
// 不再使用dist 而是使用zh_CN 和 en_US
// var outPut =  process.argv.length < 3 ? 'zh_CN' : `en_US`;
var outPut ;
switch (process.argv[2].replace(reg,'')) {
  case "src":
    outPut='zh_CN'
    break;
  case "en":
    outPut='en_US'
    break;
  case "tw":
    outPut='zh_TW'
    break;
  default:
    outPut='zh_CN'
    break;
}
module.exports = {
  entry: {
    'polyfill': `./${goalFilePath}/workbench/pc/objectAssignPolyfill.js`,
  },
  output: {
    path: paths(outPut),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths(`${goalFilePath}`),
      'assets': paths('assets'),
      'containers': paths('containers'),
      'public': paths('public'),
      'pages': paths('pages'),
      'api': paths('api'),
      'components': paths('components'),
      'router': paths('router'),
      'store': paths('store'),
      'bee': '@diworkfe/public-components/build/bee',
      '@u': '@diworkfe/public-components/build/utils',
      'pub-comp': '@diworkfe/public-components/build',
    }
  },
  externals: {
    IM: {
      type: 'var',
      var : 'typeof InitEsnIM === "undefined" ? function(){console.log("IM load fail")} : InitEsnIM',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [paths(`${goalFilePath}`)],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:8].[ext]'
        }
      }
    ]
  }
}
