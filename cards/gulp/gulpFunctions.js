import gulp from 'gulp';
import rimraf from 'rimraf';
import child_process from 'child_process';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const $ = require('gulp-load-plugins')();

const consoleStats = {
	colors: true,
	exclude: ['node_modules'],
	chunks: false,
	assets: false,
	timings: true,
	modules: false,
	hash: false,
	version: false
};

export function buildClient(cb) {
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			cb(err);
			return;
		}

		console.log(stats.toString(consoleStats));
		cb();
	});
}

export function compileServer () {
	return gulp.src('./src/server/**/*.js')
		.pipe($.changed('./build'))
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write('.', {
			sourceRoot: path.join(__dirname, 'src', 'server')
		}))
		.pipe(gulp.dest('./build'))
		.on('error', () => {});
}

export function clean (done) {
	rimraf('./build', () => done());
}

export function runServer() {
	return $.nodemon({
		script: './server.js',
		watch: 'build',
		ignore: ['**/__tests__'],
		exec: 'node --inspect'
	});
}

export function runServerTests() {
	return $.nodemon({
		script: './tests.js',
		watch: 'build'
	});
}

export function testServer(cb) {
	child_process.exec("node ./tests.js", (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);

		if (err) {
			cb(new $.util.PluginError('testServer', 'Tests failed'));
		} else {
			cb();
		}
	});
}

export function watchServer () {
	return gulp
		.watch('./src/server/**/*.js', gulp.series('compileServer'))
		.on('error', () => {});
}

export function watchClient () {
	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, {
		publicPath: '/build/',
		hot: true,
		stats: consoleStats
	});

	server.listen(8080, () => {});
}