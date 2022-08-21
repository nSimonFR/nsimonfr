const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "nsimon.fr"),
    filename: "index.js",
  },
  mode: "development",
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [
    new CopyWebpackPlugin([
      "src/index.html",
      "src/style.css",
      "src/favicon.ico",
      "src/me.png",
      "Nicolas_SIMON_CV.pdf",
    ]),
  ],
};
