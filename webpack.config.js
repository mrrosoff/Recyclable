const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const output = "dist";

module.exports = {
	entry: "./client/index.js",
	devServer: {
		contentBase: path.resolve(__dirname, output),
		port: 3000,
		open: true,
		hot: true,
		proxy: { "/api/*": "http://localhost:8080" }
	},
	devtool: "eval-source-map",
	mode: process.env.NODE_ENV || "development",
	module: {
		rules: [
			{
				test: /\.m?jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: { plugins: ["autoprefixer"] }
						}
					},
					{ loader: "sass-loader" }
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif|mp4|wav|mp3)$/i,
				loader: "file-loader"
			}
		]
	},
	output: { filename: "bundle.js", path: path.join(__dirname, output) },
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "client/static/template/index.html",
			favicon: "client/static/template/favicon.ico",
			title: "Recyclable"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
		})
	],
	stats: "minimal"
};
