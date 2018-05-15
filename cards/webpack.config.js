var path = require('path');
var _ = require('lodash');
const getPlugins = require('./webpack/getPlugins');
const getLoaders = require('./webpack/getLoaders');
const vendor = require('./webpack/vendor');
const getClientEntry = require('./webpack/getClientEntry');

function createConfig(isDebug) {
	console.log('isDebug:', isDebug);
	const devtool = isDebug ? 'eval-source-map' : null;
	console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
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
		devServer: {
			port: 8080,
			contentBase: path.join(__dirname, 'build'),
			historyApiFallback: true,
			watchOptions: { aggregateTimeout: 300, poll: 1000},
			headers: {
				"Access-Control-Allow-Origin": "http://www.localhost.com:3000",
				"Access-Control-Allow-Credentials": true,
				"Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
				"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS"
			}
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
