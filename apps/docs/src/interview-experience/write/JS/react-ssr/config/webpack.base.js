//webpack.base.js
const path = require("path");
module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				//配置babel
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
				},
			},
		],
	},
};
