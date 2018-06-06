import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import versionController from './controllers/versionController';
import defaultController from './controllers/defaultController';

// var allowCrossDomain = function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With');

// 	next();
// };

// Setup
const app = express();
const server = new http.Server(app);

app.use(cors());

// Configuration
app.set('view engine', 'pug');
// const viewsPath = path.join('..', '/views');
// app.set('views', path.join(__dirname, 'views'));
// console.log('viewsPath:', app.get('views'));
app.use(express.static('public'));

app.get('/version', versionController);
app.get('/', defaultController); // root route
app.get('*', defaultController); // fallback route

// Startup
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`A goblin-mage has conjured a server on port ${port}.`);
});
