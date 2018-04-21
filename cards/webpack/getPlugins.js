var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(isDebug) {
	var plugins = [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`
			},
			IS_PRODUCTION: !isDebug,
			IS_DEVELOPMENT: isDebug
		})
	];

	if (isDebug) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
	} else {
		plugins.push(
			new webpack.optimize.DedupePlugin(),
			new ExtractTextPlugin('[name].css'),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		);
	}

	return plugins;
};

