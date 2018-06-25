module.exports = {
  output: {
    filename: 'vue-event-hub.min.js',
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
