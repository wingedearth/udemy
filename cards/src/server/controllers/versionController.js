import {isDevelopment} from '../settings';
import pkg from '../../package.json';

export default function (req, res) {
	res.send({
		env: isDevelopment ? 'dev' : 'prod',
		version: pkg.version,
		author: pkg.author
	});
}
