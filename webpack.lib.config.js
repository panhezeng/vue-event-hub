var path = require('path')

module.exports = {
  entry: './src/plugins/vue-event-hub.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-event-hub.min.js',
//    library: 'VueEventHub',
//    libraryTarget: 'umd',
//    umdNamedDefine: true,
  },
}
