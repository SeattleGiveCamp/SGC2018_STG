const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: 'production',
	entry: {
		app: './app/index.tsx',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.png']
	},
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: [{
				loader: 'ts-loader',
				options: {
					onlyCompileBundledFiles: true,
				}
			}]
		},
		{
			test: /\.(png|jpe?g|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}]
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			title: 'Scavenger Hunt',
			inject: 'body',
		})
	]
};

module.exports = config;