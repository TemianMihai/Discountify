const { merge } = require("webpack-merge");
const { HotModuleReplacementPlugin } = require("webpack");

const config = require("./shared");
const paths = require("./paths");

module.exports = merge(config, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true,
    open: true,
    compress: true,
    publicPath: "/",
    historyApiFallback: true,
    contentBase: paths.dist
  },
  plugins: [new HotModuleReplacementPlugin()]
});
