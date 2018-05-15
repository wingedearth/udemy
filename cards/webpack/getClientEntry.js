/**
 * getClientEntry
 * @param {Boolean} isDebug -
 * @returns {array} - client entries
 */
module.exports = function(isDebug) {
	const clientEntry = [
		'babel-polyfill',
		'./src/client/client.js'
	];

	if (isDebug) {
		clientEntry.unshift(
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080/',
			'webpack/hot/only-dev-server'
		);
	}

	return clientEntry;
};
