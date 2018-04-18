var path = require('path')

module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'example.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {},
}

