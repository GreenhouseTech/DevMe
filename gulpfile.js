const gulp = require('gulp');

const sass = require('gulp-sass');

const pug = require('gulp-pug');

const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

function css(cb) {
    gulp
      .src("scss/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', console.error))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(rename('style.min.css'))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
    cb();
}

function html(cb) {
    gulp
      .src('views/**/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('dist'))
    cb()
}

function assets(cb) {
    gulp
      .src('assets/**/*.*')
      .pipe(gulp.dest('dist/assets'))
    cb();
}

function watch(cb) {
    gulp.watch('(templates|views)/**/*.pug', html)
    gulp.watch("sass/**/*.scss", css)
    gulp.watch("assets", assets)
    cb();
}

exports.html = html;
exports.css = css;
exports.assets = assets;
exports.pack = gulp.parallel(html, css, assets);
exports.watch = watch;