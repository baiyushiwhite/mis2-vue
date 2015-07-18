module.exports = {
  entry: "./src/main.js",
  output: {
    path: './build',
    filename: "build.js",
    publicPath: './build/'
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url'
      },
      {
        test: /\.vue/,
        loader: 'vue-loader'
      },
      {
        test: /\.less/,
        loader: 'css-loader!less-loader'
      },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,   loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=image/svg+xml" }
      //{ test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      //{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      //{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=static/[hash].[ext]" },
      //{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  devtool: '#source-map'
}
