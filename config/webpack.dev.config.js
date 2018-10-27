const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '9000';

const config = {
	mode: 'development',
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
	devtool: 'eval-cheap-module-source-map',
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
	devServer: {
		host: HOST,
		port: PORT,
		compress: true,
		inline: true,
		historyApiFallback: true,
		hot: true,
		overlay: true,
		open: false,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			title: 'Scavenger Hunt',
			inject: 'body'
		}),
	]
};

module.exports = config;