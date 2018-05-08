const path = require('path')

module.exports = {
  entry: './src/store.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-event-hub-store.min.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'VueEventHub',
    umdNamedDefine: true,
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
