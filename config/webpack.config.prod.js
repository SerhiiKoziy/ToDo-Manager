const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'production',
  entry: [
    path.join(process.cwd(), './src/js/index')
  ],

  output: {
    path: path.join(__dirname, 'public/assets/js/'),
    filename: 'bundle.js',
    publicPath: '/assets/js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/js/index',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true
    }),
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});