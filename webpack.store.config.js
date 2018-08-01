module.exports = {
  entry: './src/store.js',
  output: {
    filename: 'vue-event-hub-store.min.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'VueEventHub',
    umdNamedDefine: true
  },
  externals: {
    'vue': 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
