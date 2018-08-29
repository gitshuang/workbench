const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('../webpack.base.conf');
const paths = require('../paths');

const reg = /^LAN_TYPE\=/g;
const goalFilePath = process.argv.length < 3 ? 'src' : process.argv[2].replace(reg, '');
module.exports = function (config) {
  const webpackConfig = merge(baseWebpackConfig, {
    // add hot-reload related code to entry chunks
    entry: {
      main: [
        './scripts/dev-client',
        `./${goalFilePath}/workbench/pc/main.js`,
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [paths(`${goalFilePath}`)],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/,
          include: [paths('assets'), paths('node')],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: [paths(`${goalFilePath}`)],
          exclude: [paths('assets')],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 1,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#eval-source-map',
    output: {
      publicPath: config.assetsPublicPath,
      filename: 'js/[name].js',
      chunkFilename: 'js/chunk/[name]-[id].js',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': config.env,
        'process.env.HOST': config.host,
        'process.env.LUN': JSON.stringify(goalFilePath),
        'process.env.LOCALHOST': config.localhost,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(__dirname, '../../node_modules')) === 0
          );
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
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
  return webpackConfig;
};
