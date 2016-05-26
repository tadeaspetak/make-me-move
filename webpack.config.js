const path = require('path');
const webpack = require('webpack');

var config = {
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    //output goes to `build/bundle.js` (or `http://localhost:8092/build/` in DEV mode)
    publicPath: process.env.ENVIRONMENT === 'DEV' ? 'http://localhost:8092/build/' : 'build/'
  },
  module: {
    loaders: [{
      //ES6 + React (see .babelrc for more info)
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      //SASS
      test: /\.(s)?css$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      //PNG
      test: /\.png$/,
      loader: "file-loader?name=images/[name].[ext]"
    }, {
      //fonts
      test: /\.(ttf)$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  }
};

module.exports = config;
