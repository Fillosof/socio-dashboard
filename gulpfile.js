var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    // uglify = require('gulp-uglify'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
// for icon font
// var iconfont = require('gulp-iconfont');
// var iconfontCss = require('gulp-iconfont-css');
// var runTimestamp = Math.round(Date.now()/1000);
// var fontName = 'Icons'; 

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        // iconfonts: 'src/fonts/icons',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/style/main.sass',
        img: 'src/images/**/*.*',
        // iconfonts: 'src/fonts/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*',
        img: 'src/images/**/*.*',
        // iconfonts: 'src/fonts/svg/**/*.svg',
        fonts: 'src/fonts/*.*'
    },
    clean: './build'
};


var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'front-end.banshee',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write('.')) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// gulp.task('iconfonts:build', function(){
//     return gulp.src(path.src.iconfonts) // Source folder containing the SVG images
//       .pipe(iconfontCss({
//         fontName: fontName, // The name that the generated font will have
//         path: `src/style/template/_icons.scss`, // The path to the template that will be used to create the SASS/LESS/CSS file
//         targetPath: `src/style/patrials/_icons.scss`, // The path where the file will be generated
//         fontPath: path.build.iconfonts // The path to the icon font file
//       }))
//       .pipe(iconfont({
//         prependUnicode: false, // Recommended option 
//         fontName: fontName, // Name of the font
//         formats: ['svg', 'ttf', 'eot'], // The font file formats that will be created
//         normalize: true,
//         fontHeight: 1001,
//         timestamp: runTimestamp // Recommended to get consistent builds when watching files
//       }))
//       .pipe(gulp.dest(path.build.iconfonts));
//   });

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    // 'iconfonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    // watch([path.watch.iconfonts], function(event, cb) {
    //     gulp.start('iconfonts:build');
    // });
});

gulp.task('default', ['build', 'webserver', 'watch']);