import gulp from 'gulp';
import rimraf from 'rimraf';
import {
	buildClient,
	compileServer,
	clean,
	runServer,
	runServerTests,
	testServer,
	watchClient,
	watchServer
} from './gulp/gulpFunctions';

// SERVER
gulp.task('server:clean', clean);
gulp.task('compileServer', compileServer);
gulp.task('watchServer', watchServer);
gulp.task('runServer', runServer);
gulp.task('server:build',
	gulp.series(
		'server:clean',
		'compileServer'
	)
);

gulp.task('server:watch', 
	gulp.series(
		'server:build',
		'watchServer'
	));

gulp.task(
	'server:dev',
	gulp.parallel(
		'watchServer',
		'runServer'
	)
);

gulp.task('test', testServer);

gulp.task('server:test', gulp.series(
	'server:build',
	'test'
));

gulp.task('server:test:dev',
	gulp.series(
		'server:build',
		gulp.parallel(
			'watchServer',
			runServerTests
		)
	)
);


// CLIENT
gulp.task('client:clean', cb => {
	rimraf('./public/build', () => cb());
});
gulp.task(
	'client:build',
	gulp.series(
		'client:clean',
		buildClient
	)
);
gulp.task(
	'client:dev',
	gulp.series(
		'client:clean',
		watchClient
	)
);

gulp.task('dev', gulp.parallel('server:dev', 'client:dev'));
gulp.task('build', gulp.parallel('server:build', 'client:build'));