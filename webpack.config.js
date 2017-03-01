const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    './src/js/index',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/assets/js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:9090' }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
      },
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 50 versions'] })]

};