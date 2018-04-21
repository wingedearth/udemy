import express from 'express';
import http from 'http';
import {isDevelopment} from './settings';
import path from 'path';
import pkg from '../package.json';
import versionController from './controllers/versionController';
import defaultController from './controllers/defaultController';

// Setup
const app = express();
const server = new http.Server(app);

// Configuration
app.set('view engine', 'pug');
// const viewsPath = path.join('..', '/views');
// app.set('views', path.join(__dirname, 'views'));
console.log('viewsPath:', app.get('views'));
app.use(express.static('public'));


app.get('/', defaultController);
app.get('/version', versionController);

// Startup
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`A goblin-mage has conjured a server on port ${port}.`);
});
