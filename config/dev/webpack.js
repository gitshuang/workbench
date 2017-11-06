var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var baseWebpackConfig = require('../webpack.base.conf')
var paths = require('../paths')

module.exports = function (config) {
  var webpackConfig = merge(baseWebpackConfig, {
    // add hot-reload related code to entry chunks
    entry: {
      work: [
        './scripts/dev-client',
        './src/workbench/work/index.js',
      ],
      home: [
        './scripts/dev-client',
        './src/workbench/home/index.js',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [paths('src')],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: false
              }
            }
          ]
        },
      ]
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    output: {
      publicPath: config.assetsPublicPath,
      filename: 'js/[name].js',
      chunkFilename: 'js/chunk/[name]-[id].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': config.env
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../../node_modules')
            ) === 0
          )
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new FriendlyErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'home.html',
        template: 'template/index.ejs',
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'work.html',
        template: 'template/work.ejs',
        inject: false,
      }),
    ],
  });
  return webpackConfig
}
