'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/js/index',
  node: {
    fs: "empty"
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/assets/js/'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass']
      },
    ]
  }
};

