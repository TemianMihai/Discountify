const path = require("path");

module.exports = {
  dist: path.resolve(__dirname, "../build"),
  entry: path.resolve(__dirname, "../packages/app/index.tsx"),
  template: path.resolve(__dirname, "../packages/shared/static/index.html"),
};
