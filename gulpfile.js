var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  browserify    = require('browserify'),
  source        = require('vinyl-source-stream'),
  uglify        = require('gulp-uglify'),
  buffer        = require('vinyl-buffer'),
  cleanCSS      = require('gulp-clean-css'),
  rimraf        = require('gulp-rimraf'),
  vueify        = require('vueify'),
  watchify      = require('watchify');

var browserify_opt = {
  entries: ['./assets/js/main.js'],
  cache: {},
  packageCache: {},
};

gulp.task('enable-watch-mode', function() { browserify_opt.plugin = [watchify] })

gulp.task('clean', function (cb) {
  return gulp.src('./public/{js,css}/*', { read: false })
    .pipe(rimraf());
});

gulp.task('build:js', function(){
  var b = browserify(browserify_opt) // browserify の設定をして・・・
    .transform(vueify)

  function bundle() {
    b.bundle() // 一つのファイルにまとめたものを 
      .pipe(source('bundle.js')) // bundle.js という名前のファイルに記録して
      .pipe(buffer()) // https://blog.ik.am/entries/309
      .pipe(uglify()) // 圧縮
      .pipe(gulp.dest('./public/js')); // "./" に書き出します
  }

  b.on("update", bundle);
  b.on('log', gutil.log);
  bundle()
});

gulp.task('build:css', function(){
  gulp.src("./assets/css/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', ['build:js', 'build:css']);

gulp.task('watchify', ['enable-watch-mode', 'build:js']);

gulp.task('build-prod', ['clean', 'build']);

gulp.task('default', ['build-prod']); // デフォルトの gulp タスクは build です。
