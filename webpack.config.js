const { root } = require('./config/helpers');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: root(),
  entry: {
    'index': './src/app/index.js',
    // 'home': './src/app/home.js',
    // 'clients': './src/app/clients.js',
    // 'map': './src/app/map.js',
    // 'login': './src/app/login.js',
  },
  output: {
    path: root('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // TODO: * add babel.config.js, and remove inline options from here
              // TODO: **** фвв 'optional chaining' (elvis operator) plugin and use new syntax
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            // TODO: * load as file
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          // TODO: ** postcss-loader
          // TODO: **** postcss-config.js remove all comments with cssnano
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            // TODO: * load as file
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          // TODO: ** postcss-loader
          // TODO: **** postcss-config.js remove all comments with cssnano
          {
            loader: 'sass-loader',
          },
        ],
      },
      // TODO: *** font loader (file-loader) + add fonts you like via file
      // TODO: *** or just add Google Fonts
      // TODO: *** image loader (file-loader or url-loader) + add image in css (scss)
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin(
      {
        chunks: [
          'index',
          'index',
        ],
        template: 'src/index.html',
        filename: 'index.html'
      },
    ),
    new HtmlWebpackPlugin(
      {
        chunks: [
          'index',
        ],
        template: 'src/index.html',
        filename: 'index.html'
      },
    ),
    new HtmlWebpackPlugin(
      {
        chunks: [
          'index',
          'login',
        ],
        template: 'src/index.html',
        filename: 'index.html'
      },
    ),
    new HtmlWebpackPlugin(
      {
        chunks: [
          'index',
          'index',
        ],
        template: 'src/index.html',
        filename: 'index.html'
      },
    ),
  ],
};
