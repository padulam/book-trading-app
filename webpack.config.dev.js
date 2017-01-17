var webpack = require('webpack');
var path = require('path');
var port = process.env.PORT||8080;
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  devtool: 'eval',
  entry: ['webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/only-dev-server',
          APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['react-hot','babel']
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: './public'
  }
};

module.exports = config;