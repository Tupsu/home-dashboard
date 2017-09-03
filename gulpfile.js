const eslint      = require('gulp-eslint');
const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon     = require('gulp-nodemon');


gulp.task('lint', () => {
  return gulp.src(['gulpfile.js', 'app.js', './app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('nodemon', (cb) => {
  var started = false;
  nodemon({
    nodeArgs: ['--inspect'],
    debug: true,
    script: 'bin/www',
    ext: '.js',
    ignore: ['public/**/*.js', 'node_modules/**/*.js', 'gulpfile.js', 'public/**/*.sass', 'public/**/*.css'],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'home-dashboard:*'
    },
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    } else {
      browserSync.reload();
    }
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'localhost:3000',
    port: 8000,
    files: ['public/images', 'app/**/*.pug']
  });
});

gulp.task('watch', () => {
  gulp.watch(['app.js', './app/**/*.js'], ['lint']);
  gulp.watch("public/stylesheets/*.sass", ['sass']);
});

gulp.task('sass', function() {
  let stream = gulp.src("public/stylesheets/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("public/stylesheets/"));
  if (browserSync.active) {
    stream = stream.pipe(browserSync.stream());
  }
  return stream;
});

gulp.task('default', ['sass', 'lint', 'watch', 'browser-sync']);
