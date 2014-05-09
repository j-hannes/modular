var gulp       = require('gulp')
var connect    = require('gulp-connect')
var browserify = require('gulp-browserify')
var size       = require('gulp-size')
var sass       = require('gulp-sass')
var gutil      = require('gulp-util')

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
  })
})

gulp.task('html', function() {
  gulp.src('./app/index.html')
    .pipe(size({showFiles: true}))
    .pipe(connect.reload())
})

gulp.task('js', function() {
  gulp.src('src/application.js')
    .pipe(browserify({
      insertGlobals: true,
      transform: ['hbsfy'],
    }))
    .on('error', function(error) {
      gutil.log(error.message)
    })
    .pipe(size({showFiles: true}))
    .pipe(gulp.dest('./app/assets/js'))
    .pipe(connect.reload())
})

gulp.task('sass', function() {
  gulp.src('./src/application.scss')
    .pipe(sass())
    .on('error', function(error) {
      gutil.log(error.message)
    })
    .pipe(size({showFiles: true}))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('./app/*.html', ['html'])
  gulp.watch('./app/assets/img/**/*.*', ['html'])

  gulp.watch([
    './src/application.js',
    './src/modules/**/*.js',
    './src/modules/**/*.hbs',
  ], ['js'])

  gulp.watch([
    './src/application.scss',
    './src/modules/**/*.scss',
  ], ['sass'])
})

gulp.task('build', ['html', 'sass', 'js'])
gulp.task('default', ['build', 'connect', 'watch'])

