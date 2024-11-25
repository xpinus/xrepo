const path = require("path");
const nodeExternal = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
module.exports = merge(base, {
	// 注意这个值
	target: "node",
	//'core-js/stable', 'regenerator-runtime/runtime',这两个是为了兼容async语法，因为服务端用的是koa构建
	entry: [
		"core-js/stable",
		"regenerator-runtime/runtime",
		"./src/server/index.js",
	],
	output: {
		path: path.resolve("build"),
		filename: "server.js",
	},
	// 排除 Webpack 中的node模块
	externals: [nodeExternal()],
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.css$/,
	// 			use: [
	// 				{
	// 					loader: "css-loader",
	// 					options: {
	// 						modules: true,
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// },
});
