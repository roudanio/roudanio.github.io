const gulp = require('gulp');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');
const replace = require('gulp-replace');

const repoExp = /node_modules\/([\w\-\.]+)\/(dist|build\/)?/g;
const CDN = require('./cdn.json');


// Compiles SCSS files from /styl into /css
gulp.task('stylus', function() {
  return gulp.src('styl/agency.stylus')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename('agency.min.css'))
    .pipe(gulp.dest('css'))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('js/agency.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'));
});

gulp.task('html', () => {
  return gulp.src('index.dev.html')
    .pipe(replace(repoExp, (match, repo) => {
      return CDN[repo];
    }))
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

// Default task
gulp.task('default', ['stylus', 'minify-js', 'html']);
