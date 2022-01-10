const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require("./paths");

const RULES = [
  { test: /\.css$/, use: ["style-loader", "css-loader"] },
  { test: /\.(woff|woff2|eot|ttf|otf|gif|png|jpe?g|svg)$/, use: ["file-loader"] },
  { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }
];

module.exports = {
  entry: paths.entry,
  module: {
    rules: RULES
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: "[name].[contenthash].js",
    path: paths.dist
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.template
    })
  ]
};
