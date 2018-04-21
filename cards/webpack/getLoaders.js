var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(isDebug) {
	var loaders = {
		js: {
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/
		},
		
		eslint: {
			test: /\.jsx?$/,
			loader: 'eslint',
			exclude: /node_modules/
		},

		json: {
			test: /\.json$/,
			loader: 'json'
		},

		css: {
			test: /\.css$/,
			loader: 'style!css?sourceMap'
		},

		sass: {
			test: /\.scss$/,
			loader: 'style!css?sourceMap!sass?sourceMap'
		},

		files: {
			test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
			loader: 'url-loader?limit=5000'
		}
	};

	if (!isDebug) {
		loaders.css.loader = ExtractTextPlugin.extract('style', 'css');
		loaders.sass.loader = ExtractTextPlugin.extract('style', 'css!sass');
	}

	return loaders;
};
