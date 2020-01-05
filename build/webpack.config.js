/**
 * Created by meathill on 2017/7/1.
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package');
const time = Date.now();

module.exports = {
  entry: {
    index: resolve(__dirname, '../src/agency.js')
  },
  output: {
    path: resolve(__dirname, '../'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|eot|woff|ttf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  externals: {
    'jquery': 'jQuery',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.pug'),
      templateParameters: {
        version: `${pkg.version}.${time}`,
      },
    }),
  ],
  devServer: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
};
