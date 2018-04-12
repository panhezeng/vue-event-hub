var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/plugins/vue-event-hub.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vue-event-hub.min.js',
    library: 'VueEventHub',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
}
