const path = require("path");
const fs = require("fs");

const entry = {};
try {
  const files = fs.readdirSync(path.join(__dirname, "src"));
  files.forEach(function(file) {
    if (/\.js$/.test(file)) {
      //      console.log(file)
      const name = `vue-event-hub-${file.replace(".js", "")}`;
      entry[name] = `./src/${file}`;
    }
  });
} catch (e) {
  return console.log("Unable to scan directory src: " + e);
}

module.exports = {
  entry: entry,
  output: {
    filename: "[name].min.js",
    libraryTarget: "umd",
    umdNamedDefine: true,
    library: "VueEventHub",
    libraryExport: "VueEventHub"
  },
  externals: {
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
      root: "Vue"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
