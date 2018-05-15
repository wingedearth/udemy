import './client.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

// --------------------------------------
// Render

function main() {
	const routes = require('./routes').default();
	console.log('routes:', routes);

	ReactDOM.render(
		<Router history={browserHistory}>
			{routes}
		</Router>,
		document.getElementById('mount')
	);
}

// --------------------------------------
// Misc

if (module.hot) {
	module.hot.accept('./routes', () => {
		main();
	});
}

// --------------------------------------
// Go
main();
