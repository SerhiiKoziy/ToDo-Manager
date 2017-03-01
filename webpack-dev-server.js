const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: 'public',
  publicPath: config.output.publicPath,
  hot:true,
  historyApiFallback: true
}).listen(9090, 'localhost', function (err, result) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:9090/');
});
