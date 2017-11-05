/**
 * Created by beggl on 11/1/2017.
 */
var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('build', function(){
    return gulp.src( 'src/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'));
});