var paths = require('./paths')


module.exports = {
  entry: {
    'polyfill': './src/workbench/pc/objectAssignPolyfill.js',
  },
  output: {
    path: paths('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths('src'),
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
        include: [paths('src')],
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:8].[ext]'
        }
      }
    ]
  }
}
