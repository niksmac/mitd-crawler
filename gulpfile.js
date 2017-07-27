var gulp = require('gulp')
var merge = require('gulp-merge-json')
var gulpCopy = require('gulp-copy')
const SOURCE_FILES = ['dist/*']
const DESTINATION = './dist/combined/'

gulp.task('merger', function () {
  gulp.src('data/*.json')
    	.pipe(merge({
    		startObj: [],
    		concatArrays: true,
    		mergeArrays: false
    	}))
    	.pipe(gulp.dest('./dist'))
})

gulp.task('copy', function () {
  gulp.src(SOURCE_FILES)
    .pipe(gulp.dest(DESTINATION))
})

gulp.task('default', ['merger', 'copy'])
