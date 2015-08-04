var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.vue/,
        loader: 'vue-loader'
      },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,   loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=/static/[hash].[ext]&limit=10000&minetype=image/svg+xml" }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("css/[name].css")
  ]
}
