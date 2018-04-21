import {isDevelopment} from '../settings';
const useExternalStyles = !isDevelopment;
const scriptRoot = isDevelopment
	? 'http://localhost:8080/build'
	: '/build';

export default function(req, res) {
	res.render('index', {
		useExternalStyles,
		scriptRoot
	});
}
