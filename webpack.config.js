const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const StatsPlugin = require('stats-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { getLocalIdent } = require('css-loader/dist/utils');

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');
const { resolve, join } = require('path');
// const getEnvironments = require('./env');

const PORT = 8089;
const url = `http://localhost:${PORT}`;
const SRC = resolve(__dirname, 'src');

const stats = {
  assets: false,
  builtAt: false,
  version: false,
  children: false,
  modules: false,
  hash: false,
};

const devServer = {
  port: PORT,
  hot: true,
  contentBase: SRC,
  historyApiFallback: true,
  publicPath: '/',
  overlay: {
    warnings: false,
    errors: true,
  },
  stats,
};

const aliasDefault = {
  '@images': join(SRC, 'assets/images'),
  '@styles': join(SRC, 'assets/scss/main.scss'),
  '@utils': join(SRC, 'utils'),
  '@store': join(SRC, 'store'),
  '@api': join(SRC, 'api'),
  '@configs': join(SRC, 'configs'),
  '@components': join(SRC, 'components'),
  '@pages': join(SRC, 'pages'),
  '@modules': join(SRC, 'modules'),
  '@types': join(SRC, 'types'),
};

const config = async () => {
  // let envs;

  // try {
  //   envs = await getEnvironments();
  // } catch (error) {
  //   console.error(error);
  //   process.exit(1);
  // }

  return {
    mode: ifDevelopment('development', 'production'),
    devtool: ifDevelopment('cheap-module-source-map'),

    entry: {
      styles: join(SRC, 'assets', 'scss', 'index.scss'),
      main: removeEmpty([
        ifDevelopment('react-hot-loader/patch'),
        ifDevelopment(`webpack-dev-server/client?${url}`),
        ifDevelopment('webpack/hot/only-dev-server'),
        join(SRC, 'main.tsx')
      ]),
    },

    output: {
      filename: ifDevelopment('js/[name].js', 'js/[name].[hash].js'),
      chunkFilename: ifDevelopment('js/[name].js', 'js/[name].[hash].js'),
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
    },

    context: SRC,

    devServer: ifDevelopment(devServer, { stats }),

    resolve: {
      modules: [SRC, 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: { ...aliasDefault, ...ifDevelopment({ 'react-dom': '@hot-loader/react-dom' }, {}) },
    },

    optimization: {
      minimizer: removeEmpty([ifProduction(new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser
          }
        }))]),
      runtimeChunk: 'single',
      splitChunks: ifProduction({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }, {}),
    },

    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: ['ts-loader', 'ts-nameof-loader'],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: removeEmpty([
            ifDevelopment({ loader: 'css-hot-loader' }),
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: ifDevelopment(),
                importLoaders: true,
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
                camelCase: true,
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (loaderContext.resourcePath.includes('node_modules')) {
                    return localName;
                  }
                  return getLocalIdent(loaderContext, localIdentName, localName, options);
                },
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer(),
                ],
                sourceMap: ifDevelopment(),
              },
            },
            {
              loader: 'sass-loader',
              query: {
                sourceMap: ifDevelopment(),
              },
            },
          ]),
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(png|jpg|gif|ico)$/,
          exclude: [join(SRC, 'assets/seo')],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 192,
                mimetype: 'image/png',
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(png|ico)$/,
          exclude: [join(SRC, 'assets/images')],
          include: [join(SRC, 'assets/seo')],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 192,
                mimetype: 'image/png',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.pdf$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'application/font-woff',
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'application/octet-stream',
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2,
                mimetype: 'image/svg+xml',
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /site\.webmanifest$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /browserconfig\.xml$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          // TODO: replace with actual file name
          test: /googlef037150eb2571e60\.html$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },

    plugins: removeEmpty([
      new TSLintPlugin({
        files: ['./src/**/*.ts'],
        silent: process.env.TS_LINT_SILEN,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: join(SRC, 'index.html'),
        filename: 'index.html',
        inject: 'body',
      }),
      // new webpack.DefinePlugin(envs),
      ifDevelopment(new MiniCssExtractPlugin({
        filename: './styles/style.css',
      })),
      ifDevelopment(new OpenBrowserPlugin({ url })),
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
      ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
      ifProduction(new webpack.optimize.OccurrenceOrderPlugin()),
      ifProduction(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProduction(new MiniCssExtractPlugin({
        filename: './styles/style[hash].css',
      })),
      ifProduction(new CopyWebpackPlugin([{ from: './*.config', to: '', toType: 'file' }])),
      // ifProduction(new RobotstxtPlugin({
      //   policy: [
      //     robotsConfig,
      //   ]
      // })),
      ifProduction(new StatsPlugin('stats.json')),
    ]),
  };
}

module.exports = config;
