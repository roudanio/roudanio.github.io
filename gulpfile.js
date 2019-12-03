const {parallel, src, dest} = require('gulp');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const htmlMin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const imageMin = require('gulp-imagemin');

const repoExp = /node_modules\/([\w\-\.]+)\/((?:dist|build)\/)?/g;
const CDN = require('./cdn.json');

// Compiles SCSS files from /styl into /css
const stylusTask = function() {
  return src('styl/agency.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename('agency.min.css'))
    .pipe(dest('css'));
};

const html = () => {
  return src('index.dev.html')
    .pipe(replace(repoExp, (match, repo) => {
      return CDN[repo];
    }))
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))
    .pipe(rename('index.html'))
    .pipe(dest('./'));
};

const image = () => {
  return src('./assets/img/**')
    .pipe(imageMin())
    .pipe(dest('./img'));
};

// Default task
exports.default = parallel(stylusTask, html);
