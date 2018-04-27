var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var getPlugins = require('./webpack/getPlugins');
var getLoaders = require('./webpack/getLoaders');

const vendor = [
	'lodash'
];

function getClientEntry(isDebug) {
	const clientEntry = [
		'./src/client/client.js'
	];

	if (isDebug) {
		clientEntry.unshift(
			'webpack-dev-server/client?http://localhost:8080/',
			'webpack/hot/only-dev-server'
		);
	}

	return clientEntry;
}

function createConfig(isDebug) {
	const devtool = isDebug ? 'eval-source-map' : null;
	console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
	console.log('devtool:', devtool);
	const plugins = getPlugins(isDebug);
	const loaders = getLoaders(isDebug);
	const publicPath = isDebug ? 'http://localhost:8080/build/' : '/build/';

	return {
		name: 'client',
		devtool,
		entry: {
			app: getClientEntry(isDebug),
			vendor
		},
		output: {
			path: path.join(__dirname, 'public', 'build'),
			filename: '[name].js',
			publicPath
		},
		resolve: {
			extensions: ['', '.js', '.jsx'],
			alias: {
				shared: path.join(__dirname, 'src', 'server', 'shared')
			}
		},
		module: {
			loaders: _.values(loaders)
		},
		plugins
	};
}

module.exports = createConfig(process.env.NODE_ENV !== 'production');
module.exports.create = createConfig;
