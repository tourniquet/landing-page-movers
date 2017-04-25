const gulp = require('gulp')
const concat = require('gulp-concat')
const uglifyJs = require('gulp-uglify')
const uglifyCss = require('gulp-uglifycss')
const sass = require('gulp-sass')
// const jshint = require('gulp-jshint')
const myth = require('gulp-myth')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const jade = require('gulp-jade')
const beeper = require('beeper')
const browserSync = require('browser-sync')
const babel = require('gulp-babel')

const onError = err => {
  beeper()
  console.log(err)
}

var cssFiles = [
  'dev/css/bootstrap.css',
  'dev/css/bootstrap-datetimepicker.css',
  'dev/css/bootstrap-select.css',
  'dev/css/font-awesome.css',
  'dev/css/*.css'
]

// SASS taks
gulp.task('sass', () => {
  gulp
    .src('dev/css/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
})

gulp.task('styles', () => {
  gulp
    .src(cssFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('css/style.css'))
    .pipe(myth())
    .pipe(gulp.dest('build'))
})

gulp.task('minifyCss', () => {
  gulp
    .src('build/css/style.css')
    .pipe(uglifyCss())
    .pipe(rename('css/style.min.css'))
    .pipe(gulp.dest('build'))
})

gulp.task('jade', () => {
  gulp
    .src('dev/*.jade')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade())
    .pipe(gulp.dest('build/'))
})

gulp.task('js', () => {
  gulp
    .src('dev/js/*.js')
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('js/scripts.js'))
    .pipe(uglifyJs())
    .pipe(gulp.dest('build'))
})

var libsFiles = [
  'dev/libs/jquery-1.11.3.js',
  'dev/libs/moment.js',
  'dev/libs/jquery.validate.js',
  'dev/libs/bootstrap.js',
  'dev/libs/bootstrap-datetimepicker.js',
  'dev/libs/bootstrap-select.js',
  'dev/libs/*.js'
]

gulp.task('libs', () => {
  gulp
    .src(libsFiles)
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(concat('libs/libs.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('minifyLibs', () => {
  gulp
    .src('build/libs/libs.js')
    .pipe(uglifyJs())
    .pipe(rename('libs/libs.min.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('browserSync', cb => {
  browserSync({
    server: {
      baseDir: './build'
    }
  }, cb)
})

gulp.task('watch', () => {
  gulp.watch('dev/css/*.sass', ['sass'])
  gulp.watch('dev/css/*.css', ['styles'])
  gulp.watch('build/css/style.css', ['minifyCss', browserSync.reload])
  gulp.watch('dev/*.jade', ['jade', browserSync.reload])
  gulp.watch('dev/js/*.js', ['js', browserSync.reload])
  gulp.watch('dev/libs/*.js', ['libs', browserSync.reload])
  gulp.watch('build/libs/libs.js', ['minifyLibs', browserSync.reload])
})

gulp.task('default', ['sass', 'styles', 'minifyCss', 'jade', 'libs', 'js', 'minifyLibs', 'browserSync', 'watch'])
