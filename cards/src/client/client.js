import './client.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import * as A from './actions';
import {StoreProvider} from './lib/component';
import {Dispatcher} from 'shared/dispatcher';
import createStores from './stores';

// --------------------------------------
// Services

const dispatcher = new Dispatcher();
const services = {dispatcher};

// --------------------------------------
// Stores

const stores = createStores(services);

// --------------------------------------
// Render

function main() {
	const routes = require('./routes').default();
	console.log('routes:', routes);

	ReactDOM.render(
		<StoreProvider stores={stores} services={services}>
			<Router history={browserHistory}>
				{routes}
			</Router>
		</StoreProvider>,
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
