var path = require('path')

module.exports = {
  mode: 'production',
//  mode: 'development',
  entry: './src/vue-event-hub.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-event-hub.min.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'VueEventHub',
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
}
