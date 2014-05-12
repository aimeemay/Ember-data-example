var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');

gulp.task('templates', function(){
  gulp.src(['static/views/*.handlebars'])
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('static'));
});


gulp.task('default', function() {
    gulp.start('templates');
});