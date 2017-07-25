var gulp = require('gulp');
var merge = require('gulp-merge-json');

gulp.task('merger', function() {
	gulp.src('data/*.json')
    	.pipe(merge())
    	.pipe(gulp.dest('./dist'));
})

gulp.task('default', ['merger']);