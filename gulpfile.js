var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var jshint = require('gulp-jshint');
var myth = require('gulp-myth');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var beeper = require('beeper');
var browserSync = require('browser-sync');

var onError = function(err) {
	beeper();
	console.log(err);
};


var cssFiles = [
	'dev/css/bootstrap.css',
	'dev/css/bootstrap-datetimepicker.css',
	'dev/css/bootstrap-select.css',
	'dev/css/font-awesome.css',
	'dev/css/*.css'
];

gulp.task('styles', function() {
	gulp.src(cssFiles)
		.pipe(plumber({
		  errorHandler: onError
		}))
		.pipe(concat('css/style.css'))
		.pipe(myth())
		.pipe(gulp.dest('build'));
});


gulp.task('minifyCss', function() {
	gulp.src('build/css/style.css')
		.pipe(uglifyCss())
		.pipe(rename('css/style.min.css'))
		.pipe(gulp.dest('build'));
});


gulp.task('jade', function() {
	gulp.src('dev/*.jade')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(jade())
		.pipe(gulp.dest('build/'))
});


gulp.task('js', function() {
	gulp.src('dev/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('js/scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'))
});


var libsFiles = [
	'dev/libs/jquery-1.11.3.js',
	'dev/libs/moment.js',
	'dev/libs/jquery.validate.js',
	'dev/libs/bootstrap.js',
	'dev/libs/bootstrap-datetimepicker.js',
	'dev/libs/bootstrap-select.js',
	'dev/libs/*.js'
];

gulp.task('libs', function() {
	gulp.src(libsFiles)
		// .pipe(jshint())
		// .pipe(jshint.reporter('default'))
		.pipe(concat('libs/libs.js'))
		.pipe(gulp.dest('build'))
});


gulp.task('minifyLibs', function() {
  gulp.src('build/libs/libs.js')
    .pipe(uglify())
    .pipe(rename('libs/libs.min.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('browserSync', function(cb) {
	browserSync({
		server: {
			baseDir: './build'
		}
	}, cb);
});


gulp.task('watch', function() {
	gulp.watch('dev/css/*.css', ['styles']);
	gulp.watch('build/css/style.css', ['minifyCss', browserSync.reload]);
	gulp.watch('dev/*.jade', ['jade', browserSync.reload]);
	gulp.watch('dev/js/*.js', ['js']);
	gulp.watch('dev/libs/*.js', ['libs']);
	gulp.watch('build/libs/libs.js', ['minifyLibs']);
});


gulp.task('default', ['styles', 'minifyCss', 'jade', 'libs', 'js', 'minifyLibs', 'browserSync', 'watch']);
