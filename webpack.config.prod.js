const baseConfig = require('./webpack.config');

const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    // TODO: **** add cssnano plugin
  ],
});
