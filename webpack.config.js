const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  // devtool: 'source-map',
  mode: "development",
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    './src/js/index',
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: '/assets/js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    // new OpenBrowserPlugin({ url: 'http://localhost:9090' }),
  ],
  module: {
    // loaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     loaders: [
    //       require.resolve('react-hot-loader'),
    //       require.resolve('babel-loader'),
    //     ],
    //   },
    //   { test: /\.json$/, loader: 'json-loader' },
    //   { test: /\.ttf$/, loader: 'file-loader' },
    //   { test: /\.woff$/, loader: 'file-loader' },
    //   { test: /\.eot$/, loader: 'file-loader' },
    //   { test: /\.svg$/, loader: 'file-loader' },
    //   { test: /\.png$/, loader: 'url-loader' },
    //   {
    //     test: /\.css$/,
    //     loader: 'style!css',
    //   },
    //   {
    //     test: /\.scss$/,
    //     loader: 'style!css!sass',
    //   },
    // ],
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js$/,
        enforce: "pre",
        //loader: "eslint-loader"
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
           loader: "css-loader",
           query: {
             options: {
               modules: true
             }
           },
          }
        ]
      },
    ]
  }
};
