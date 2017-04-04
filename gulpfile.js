const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const del = require('del');
const gulpWebpack = require('gulp-webpack');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');

function readdirAsync(path) {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (error, result) => {
			if( error ) return reject(error);
			resolve(result);
		});
	});
}

const paths = {
	src: 'src/server/**/*.{js,jsx}',
	dest: 'lib',
	memes: 'src/client/memes/**/*.{png,jpg,jpeg}',
	client: 'lib/static'
};

gulp.task('clean-build', _ => del(paths.dest));

gulp.task('build-client', _ => {
	return gulpWebpack(require('./webpack.config.js'), webpack)
		.pipe(gulp.dest(paths.client));
});

// hooookay, so I'm not sure exactly how I want to organize the meme images, so this is a nasty hack to build the export object for me. 
gulp.task('build-meme-list', async _ => {
	const categories = await readdirAsync(path.join(__dirname, 'src/client/memes'));
	const list = {};
	for( const category of categories ) {
		if( /\./g.test(category) ) continue; // skip any files. (this only checks for a period in the filename..)
		const files = await readdirAsync(path.join(__dirname, 'src/client/memes', category));
		list[category] = files;
	}
	const fileContents = `
		export default function getMemeList() {
			return ${JSON.stringify(list)}
		}
	`;
	fs.writeFile(path.join(__dirname, 'src/client/memes', 'index.js'), fileContents, 'utf-8', err => {
		if( err ) console.error(err);
	});
	return gulp.src(paths.memes)
		.pipe(rename( filepath => filepath.dirname = path.join('static', 'memes', filepath.dirname) )) // put the server output in the top level of lib
		.pipe(gulp.dest(paths.dest));
})

gulp.task('build-server', _ => {
	return gulp.src(paths.src)
		.pipe(babel())
		.pipe(rename( path => path.dirname = './' )) // put the server output in the top level of lib
		.pipe(gulp.dest(paths.dest))
})
