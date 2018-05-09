import './client.scss';
import ReactDOM from 'react-dom';

console.log('Hello from the client! This is a change!');

function main() {
	const routes = require('./routes').default();

	ReactDOM.render(routes, document.getElementById('mount'));
}

main();

if (module.hot) {
	module.hot.accept('./routes', () => {
		main();
	});
}
