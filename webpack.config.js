const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/main.tsx",
  devtool: "cheap-module-source-map",
  mode: process.env.NODE_ENV || "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({ filename: "[name].[chunkhash].css" }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    historyApiFallback: true
  }
};
