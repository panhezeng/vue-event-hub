const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'example.js'
  },
  externals: {
    'vue': 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|dist/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {}
}

