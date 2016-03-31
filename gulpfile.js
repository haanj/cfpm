'use strict'
let gulp = require('gulp')
let lint = require('gulp-eslint')
let mocha = require('gulp-mocha')

var paths = ['*.js', 'test/*js', 'lib/*js', 'models/*js']
var tests = ['test/*js']

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format())
})

gulp.task('mocha', function() {
  return gulp.src(tests)
    .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('default', ['lint', 'mocha'])

gulp.watch(paths, function(){
  gulp.run('default')
})
