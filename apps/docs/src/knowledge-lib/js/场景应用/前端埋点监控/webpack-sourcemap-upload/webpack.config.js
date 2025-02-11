const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UploadSourceMapPlugin = require("upload-sourcemap-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build"),
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({ template: "./public/index.html" }),
		new CleanWebpackPlugin(),
		new UploadSourceMapPlugin(),
	],
};
