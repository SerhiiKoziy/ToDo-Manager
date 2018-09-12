const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.config.dev');

new WebpackDevServer(webpack(config), {
  contentBase: 'public',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(9090, 'localhost', (err) => {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:9090/');
});
