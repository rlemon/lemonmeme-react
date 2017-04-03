const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const del = require('del');
const gulpWebpack = require('gulp-webpack');
const rename = require('gulp-rename');

const paths = {
	src: 'src/server/**/*.{js,jsx}',
	dest: 'lib',
	client: 'lib/static'
};

gulp.task('clean-build', _ => del(paths.dest));

gulp.task('build-client', _ => {
	return gulpWebpack(require('./webpack.config.js'), webpack)
		.pipe(gulp.dest(paths.client));
});

gulp.task('build-server', _ => {
	return gulp.src(paths.src)
		.pipe(babel())
		.pipe(rename( path => path.dirname = './' )) // put the server output in the top level of lib
		.pipe(gulp.dest(paths.dest))
})