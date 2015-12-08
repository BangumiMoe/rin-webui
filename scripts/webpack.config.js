var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.jpg', '.png']
  },
  module: {
    loaders: [
      { test: /\.js$/,            loaders: ['babel'], exclude: [/node_modules/] },
      { test: /\.vue$/,           loaders: ['vue'] },
      { test: /\.less$/,          loader: 'style!css!less' },
      { test: /\.(png|jpg|gif)$/, loader: 'file?name=[hash].[ext]?' }// loader: 'file?name=[name].[ext]?[hash]' }
    ]
  },
  vue: {
    loaders: {
      css: 'style!css!less',
      js: 'babel'
    }
  },
  plugins: [],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
