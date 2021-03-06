const baseConfig = require('./webpack.config');

const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    index: 'home.html',
  },
});
