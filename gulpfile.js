var path = require('path');
var fs = require('fs');
var yargs = require('yargs').argv;
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var tap = require('gulp-tap');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var gulpSequence = require('gulp-sequence')

var option = {base: 'src'};
var dist = './release';
var build = __dirname + '/build';
var minhtmlOptions = {
    removeComments: true,  //清除HTML注释
    collapseWhitespace: true,  //压缩HTML
    collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: false,  //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
    minifyJS: true,  //压缩页面JS
    minifyCSS: true  //压缩页面CSS
};

function projectHtml(pathName) {
    return gulp.src(pathName, option)
        .pipe(tap(function (file, t) {
            var dir = path.dirname(file.path);
            var contents = file.contents.toString();
            contents = contents.replace(/@import\s+"(.*)";/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '\n' + content + '\n';
            });
            contents = contents.replace(/<link\s+rel="import"\s+href="(.*)">/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                filename = filename.replace('.html', '.min.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '<script type="text/html" id="tpl_' + id + '">\n' + content + '\n</script>';
            });
            file.contents = new Buffer(contents);
            console.log(path.basename(file.path));
        }))
        // .pipe(htmlmin(minhtmlOptions))//上传代码时使用,压缩html
        .pipe(gulp.dest(dist))
        .on('end', function () {
            var date = new Date();
            browserSync.reload()
            console.log('编译完成！！ ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
        })
}

function toMinHtml(pathName, cbBoolean) {
    return gulp.src(pathName, option)
        .pipe(tap(function (file, t) {
            var dir = path.dirname(file.path);
            var contents = file.contents.toString();
            contents = contents.replace(/@import\s+"(.*)";/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '\n' + content + '\n';
            });
            contents = contents.replace(/<link\s+rel="import"\s+href="(.*)">/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '<script type="text/html" id="tpl_' + id + '">\n' + content + '\n</script>';
            });
            file.contents = new Buffer(contents);
            console.log(path.basename(file.path) + '.min');
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename + '.min';
        }))
        .pipe(gulp.dest("src"))
        .on('end', function () {
            cbBoolean ? projectHtml(['src/project/**/*.html']) : ''
        });
}

gulp.task('build:project:assets', function () {
    gulp.src(['src/project/*/images/**/*.*', 'src/project/*/fonts/*.*'], option)
        .pipe(gulp.dest(dist));
    gulp.src('src/project/*/js/*.?(js)', option)
        .pipe(gulp.dest(dist));
});

gulp.task('build:project:style', function () {
    return gulp.src(['src/project/*/*.less', 'src/project/**/part/*.less'], option)
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))
        .pipe(rename(function (path) {
            path.basename = 'style/' + path.basename + '.min';
            console.log(path.basename)
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:project:js', function () {
    gulp.src(['src/project/*/*.js', 'src/project/**/part/*.js'], option)
        .pipe(tap(function (file) {
            var dir = path.dirname(file.path);
            var contents = file.contents.toString();
            contents = contents.replace(/@import\s+"(.*)";/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '\n' + content + '\n';
            });
            contents = contents.replace(/@import\s+"(.*)";/gi, function (match, $1) {
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                return '\n' + content + '\n';
            });
            file.contents = new Buffer(contents);
        }))
        // .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename = 'js/' + path.basename + '.min';
            console.log(path.basename)
        }))
        .pipe(gulp.dest(dist));
});

gulp.task('build:project:min:html', function () {
    return toMinHtml(['src/pages/**/*.html', 'src/model/**/*.html', '!src/**/*.min.html'])
});

gulp.task('build:project:html', function () {
    return projectHtml(['src/project/**/*.html'])
});

gulp.task('build:project', gulpSequence(['build:project:assets', 'build:project:style', 'build:project:js', 'build:project:min:html'], 'build:project:html'));

gulp.task('release', ['build:project']);

gulp.task('watch', function () {
    gulp.watch(['src/project/*/*.less', 'src/project/**/part/*.less'], ['build:project:style']);
    gulp.watch('src/style/**/*.less', ['build:project:style']);
    gulp.watch('src/style/*/*.less', ['build:project:style']);
    gulp.watch('src/project/**/*.?(png|jpg|gif|eot|svg|ttf|woff)', ['build:project:assets']);
    gulp.watch('src/js/**/*.?(js)', ['build:project:js', 'build:project:html']);
    gulp.watch(['src/project/**/*.js', 'src/project/**/part/*.js'], ['build:project:js']);
    gulp.watch(['src/project/**/*.html', '!src/**/*.min.html'], function (event) {
        projectHtml(event.path)
    });
    gulp.watch(['src/model/**/*.html', 'src/pages/**/*.html', '!src/**/*.min.html'], function (event) {
        toMinHtml(event.path, true)
    });
    // gulp.watch(['src/**/*.{js,less,html,css,png,jpg,gif,svg,eot,ttf,woff}'], function () {
    //     gulp.start('swregister');
    // })
});

gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./release/project"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/PC/home/index.html'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function () {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
    gulp.start('swregister');
});

gulp.task('swregister', function (callback) {
    var swPrecache = require('sw-precache');
    var rootDir = './release/project';

    swPrecache.write(`${rootDir}/PC/service-worker.js`, {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
        stripPrefix: rootDir
    }, callback);
});
