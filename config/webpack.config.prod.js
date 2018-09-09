const path = require('path');

module.exports = require('./webpack.config.base')({
  mode: 'production',
  entry: [
    path.join(process.cwd(), './src/js/index')
  ],

  output: {
    path: path.join(__dirname, '../public/assets/js/'),
    filename: 'bundle.js',
    publicPath: './assets/js',
  },

  plugins: [

  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});