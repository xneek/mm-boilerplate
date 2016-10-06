const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
var  jsdoc = require('gulp-jsdoc3');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
 
gulp.task('doc', function (cb) {
	var config = require('./jsdoc.json');
	gulp.src(['src/**/*.js'], {read: false})
	.pipe(jsdoc(config, cb));

	
});
 
gulp.task('es6', function(){
    return gulp.src('src/js/*.js')
	.pipe(plumber())
	.pipe(sourcemaps.init())
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest('dist'))
	.pipe(uglify())
	.pipe(sourcemaps.write('.'))
	.pipe(rename('main.min.js'))
	.pipe(plumber.stop())
	.pipe(gulp.dest('dist'))
});


gulp.task('less', function () {
    return gulp.src('src/less/*.less')
	.pipe(plumber())
	.pipe(sourcemaps.init())
        .pipe(less({
    		plugins: [autoprefix]
  	 }))
	//.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(sourcemaps.write('.'))
    .pipe(rename('main.min.css'))
	.pipe(plumber.stop())
    .pipe(gulp.dest('dist'))
});


gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['es6']);
	gulp.watch('src/**/*.less', ['less']);
});



