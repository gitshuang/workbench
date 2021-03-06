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
      main: [
        './scripts/dev-client',
        'whatwg-fetch',
        './src/workbench/pc/objectAssignPolyfill.js',
        './src/workbench/pc/main.js',
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
          include: [paths('assets'), paths('node'), paths('bee')],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
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
        {
          test: /\.css$/,
          include: [paths('src')],
          exclude: [paths('assets'), paths('bee')],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
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
    devtool: '#eval-source-map',
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
        filename: 'index.html',
        template: 'template/dev.ejs',
        inject: false,
      }),
    ],
  });
  return webpackConfig
}
