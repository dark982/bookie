/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var jsFiles = [
    
    
    './src/js/BookiePages.js',
    './src/js/BookmarkUtils.js',
    './src/js/Bookmarks.js',
    './src/js/Templater.js',
    './src/js/Bookie.js',
    './src/js/Utils.js',
    
    
    './src/js/events/*.js',
    
];

var jsLib = [
    './node_modules/underscore/underscore-min.js',
    './libraries/jQuery.js',
    './libraries/fontawesome/js/fontawesome-all.min.js',
    
];

var cssLib = [
     './libraries/fontawesome/css/fa-svg-with-js.css',
];

var jsDest = 'dist/js';
var cssDest = 'dist/css';

gulp.task('default', function () {
    
    gulp.src('./src/assets/**')
            .pipe(gulp.dest('./dist/assets'));
    
    gulp.src('./src/fonts/**')
            .pipe(gulp.dest('./dist/fonts'));
    
    gulp.src('./src/html/**')
            .pipe(gulp.dest('./dist/html'));
    
    gulp.src('./src/css/**')
            .pipe(gulp.dest('./dist/css'));
    
    gulp.src('./src/templates/**')
            .pipe(gulp.dest('./dist/templates'));
    
    gulp.src('./src/manifest.json')
            .pipe(gulp.dest('./dist'));
        
    gulp.src(jsFiles)
            .pipe(concat('app.js'))
            .pipe(gulp.dest(jsDest));
        
    gulp.src(jsLib)
            .pipe(concat('libs.js'))
            .pipe(gulp.dest(jsDest));

    gulp.src(cssLib)
            .pipe(concat('libs.css'))
            .pipe(gulp.dest(cssDest));
    
    
});


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});