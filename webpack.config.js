/**
 * webpack config for the react app.
 * @author gaurav
 */

const webpack = require ('webpack');
const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve (__dirname, 'src/client/build');
const APP_DIR = path.resolve (__dirname, 'src/client/app');



const config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js'
	},

	devServer: {
		contentBase: './src/client/build'
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.(sass|scss)$/,
				use: 
					// { loader: 'style-loader' },	 // create style nodes from JS Strings
					// { loader: 'css-loader' },	// translates CSS into common JS
					// { loader: 'sass-loader', options: {
					// 	includePaths: [ APP_DIR ]
					// } },	// compiles Sass to CSS
					ExtractTextPlugin.extract ({
						fallback: 'style-loader',
						use: [ 'css-loader','sass-loader']
					})
				
			},
			{
				test: /\.css?/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true
							},
							gifsicle: {
								interlanced: false
							},
							optipng: {
								optimizationLevel: 4
							},
							pngquant:{
								quality: '75-90',
								speed: 3
							}
						}
					},
					// 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false&progressive=true&quality'
				],
				exclude: '/node_modules/',
				include: APP_DIR
			},
		]
	},

	plugins:[
		new HtmlWebpackPlugin({ template: './src/client/app/index.html' }),
		new ExtractTextPlugin ('[name].css'),
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config;