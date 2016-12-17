require('es6-promise').polyfill();

var gulp = require('gulp');
var gutil = require('gulp-util'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    prefixer = require('gulp-autoprefixer'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        js: 'dist/scripts/',
        style: 'dist/styles/',
        img: 'dist/images/',
        fonts: 'dist/fonts/',
        back: 'dist/backend/'
    },
    src: { //Пути откуда брать исходники
        html: 'app/*.html', //Синтаксис app/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'app/scripts/**/*',//В стилях и скриптах нам понадобятся только main файлы
        style: 'app/styles/**/*',
        img: 'app/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'app/fonts/**/*.*',
        back: 'app/backend/**/*.*'
    },
    clean: './dist'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(useref())
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer({
            cascade: false,
            browsers: ['> 1%', 'last 5 versions'],
            add: true
        })) //Добавим вендорные префиксы
        // .pipe(cssnano()) //Сожмем
        .pipe(gulp.dest(path.build.style)) //И в build
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('back:build', function() {
    gulp.src(path.src.back)
        .pipe(gulp.dest(path.build.back))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'back:build'
]);

gulp.task('default', ['build']);