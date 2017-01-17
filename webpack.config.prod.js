var webpack = require('webpack');
var path = require('path');
var port = process.env.PORT||8080;
var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module:{
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['babel']
      }
    ]
  }
};

module.exports = config;