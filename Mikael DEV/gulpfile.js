/**
* Gulpfile.
* Project Configuration for gulp tasks.
*/

var pkg = require('./package.json');
var slug = pkg.slug;

var appDestination = './app/';
var distDestination = './dist/';
var buildDestination = './build/' + slug + '/';

// Source files.
var pugFolder = appDestination + 'pug/';
var imgFolder = distDestination + 'assets/img/';
var cssFolder = distDestination + 'assets/css/';
var sassFolder = appDestination + 'scss/';
var controllersFolder = appDestination + 'controllers/';
var vendorsFolder = distDestination + 'assets/vendors/';
var scriptsFolder = distDestination + 'assets/scripts/';

// Browsers you care about for autoprefixing. https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
	'last 2 version',
	'> 1%',
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4',
	'bb >= 10'
];

// Requirements
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug'),
	concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglifyjs'),

	//build
	jimp = require('gulp-jimp'),
	htmlbeautify = require('gulp-html-beautify'),
	zip = require('gulp-zip'),
	cleaner = require('gulp-clean');

/**
 * Development Tasks.
 */

gulp.task('sass', function() {
	return gulp.src(sassFolder + '**/!(_)*.scss')
	.pipe(sass())
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(csscomb())
	.pipe(rename({
		suffix: '',
		prefix : 'vlt-'
	}))
	.pipe(gulp.dest(cssFolder))

	// minify
	.pipe(cleanCSS())
	.pipe(rename({
		suffix: '.min',
		prefix : ''
	}))
	.pipe(gulp.dest(cssFolder));
});

gulp.task('css-plugins', function() {
	return gulp.src(cssFolder + 'plugins/*.css')
	.pipe(concatCss('vlt-plugins.css'))
	.pipe(gulp.dest(cssFolder))
	.pipe(cleanCSS())
	.pipe(rename({
		suffix: '.min',
		prefix : ''
	}))
	.pipe(gulp.dest(cssFolder));
});

gulp.task('scripts', function() {
	return gulp.src(controllersFolder + '**/_*.js')
	.pipe(concat('vlt-controllers.js'))
	.pipe(gulp.dest(scriptsFolder))

	// minify
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min',
		prefix : ''
	}))
	.pipe(gulp.dest(scriptsFolder));
});

gulp.task('vendors', function() {
	return gulp.src([
		vendorsFolder + 'animsition.min.js',
		vendorsFolder + 'gsap.min.js',
		vendorsFolder + 'superclick.min.js',
		vendorsFolder + 'jquery.pagepiling.min.js',
		vendorsFolder + 'jquery-numerator.js',
		vendorsFolder + 'jquery.validate.min.js',
		vendorsFolder + 'swiper.min.js',
		vendorsFolder + 'jquery.fitvids.js',
		vendorsFolder + 'jquery.fancybox.min.js',
		vendorsFolder + 'fastclick.js',
		vendorsFolder + 'css-vars-ponyfill.min.js'
	])
	.pipe(concat('vlt-plugins.js'))
	.pipe(gulp.dest(scriptsFolder))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min',
		prefix : ''
	}))
	.pipe(gulp.dest(scriptsFolder));
});

gulp.task('pug', function() {
	return gulp.src(pugFolder + '**/!(_)*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(distDestination))
});

gulp.task('watch', function() {
	gulp.watch(pugFolder + '**/*.pug', gulp.parallel('pug'));
	gulp.watch(sassFolder + '**/*.scss', gulp.parallel('sass'));
	gulp.watch(controllersFolder + '**/*.js', gulp.parallel('scripts'));
	gulp.watch(vendorsFolder + '**/*.js', gulp.parallel('vendors'));
});

gulp.task('default', gulp.parallel('watch', 'pug', 'sass', 'css-plugins', 'scripts', 'vendors'));

/**
 * Build Tasks.
 */

gulp.task('build-clean', function() {
	return gulp.src('./build/*', {
		read: false
	})
	.pipe(cleaner());
});

gulp.task('build-copy', function() {
	return gulp.src('./dist/**')
	.pipe(gulp.dest(buildDestination))
});

gulp.task('build-image-placeholder', function() {
	return gulp.src([
		imgFolder + '**/*.{png,gif,jpg}',
		'!' + imgFolder + 'root/*.{png,gif,jpg}',
		'!' + imgFolder + 'landing/*.{png,gif,jpg}'
	], {
		base: imgFolder
	})
	.pipe(jimp({
		'': {
			posterize: 2,
			greyscale: true
		}
	}))
	.pipe(gulp.dest(buildDestination + 'assets/img/'))
});

gulp.task('build-html-beautify', function() {
	return gulp.src(buildDestination + '**/*.html')
	.pipe(htmlbeautify({
		indentSize: 2,
		indent_with_tabs: true
	}))
	.pipe(gulp.dest(buildDestination))
});

gulp.task('build-clean-and-copy', gulp.series('build-clean', 'build-copy', 'build-html-beautify', 'build-image-placeholder'), function() {});

gulp.task('build-zip', function() {
	return gulp.src(buildDestination + '/**', {
		base: 'build'
	})
	.pipe(zip(slug + '.zip'))
	.pipe(gulp.dest('./build/'));
});

gulp.task('build-clean-after-zip', function() {
	return gulp.src([
		buildDestination,
		'!/build/' + slug + '.zip'
	], {
		read: false
	})
	.pipe(cleaner());
});

gulp.task('build-zip-and-clean', gulp.series('build-zip', 'build-clean-after-zip'), function() {});

// Build
gulp.task('build', gulp.series('build-clean', gulp.parallel('pug', 'sass', 'css-plugins', 'scripts', 'vendors'), 'build-clean-and-copy', 'build-zip-and-clean'));