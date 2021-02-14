// const {src, task} = require('gulp');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jsdoc = require('gulp-jsdoc3');

gulp.task('eslint', () => {
    return gulp.src(['./src/js/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('doc', cb => {
    gulp.src(['README.md', './src/**/*.js'], { read: false })
        .pipe(jsdoc(cb));
});
