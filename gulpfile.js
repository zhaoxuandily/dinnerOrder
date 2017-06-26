var gulp = require('gulp');
var eslint = require('gulp-eslint');
var fs = require('fs');

var stylelint = require('gulp-stylelint');
var stylelfmt = require('gulp-stylefmt');
var checkStyleFormatter = require('./checkrule/lib/checkstyle-formatter');

// var htmlcs = require('hny-gulp-htmlcs');
// 错误等级配置
var errorLevel = require('./checkrule/lib/errlevel');

/*
 * target 要检查的目标文件（目录），glob 或者包含 globs 的数组。参考 https://github.com/isaacs/node-glob
 */
var target = 'src/**/*.js';

gulp.task('jscheck', function() {
    var verboseLog = 'report' + Date.now() + '.log';
    var checkstyleXML = 'elint-_report_checkstyle-' + Date.now() + '.xml';
    return gulp.src([target])
        // 按照规则处理代码
        .pipe(eslint({
                configFile: './checkrule/js/.eslintrc.json'         
        }))
        .pipe(eslint.format('checkstyle',fs.createWriteStream('reports/js/'+checkstyleXML)));

});

/*
 * target 要检查的目标文件（目录），glob 或者包含 globs 的数组。参考 https://github.com/isaacs/node-glob
 * dest 处理后的文件（目录）存放的目录。通常情况下与 target 保持一致
 */
var targetCss = 'src/styles/**/*.css';
var dest = 'reports/css/dest/';

gulp.task('csscheck', function() {
    var verboseLog = 'report' + Date.now() + '.log';
    var checkstyleXML = 'stylelint-_report_checkstyle-' + Date.now() + '.xml';
    return gulp.src(targetCss)
        // 按照规则处理代码
        .pipe(stylelfmt({
            configFile: './checkrule/css/.stylefmtrc'
        }))
        .pipe(gulp.dest(dest))
        // 按照规则check代码
        .pipe(stylelint({
            configFile: './checkrule/css/.stylelintrc',
            failAfterError: false,
            // 报告路径
            reportOutputDir: './reports/css',
            // 输出结果
            reporters: [{ // 控制台输出
                formatter: 'verbose',
                console: true
            }, { // 普通文本形式的文件
                formatter: 'verbose',
                save: verboseLog
            }, { // checkstyle xml文件
                formatter: checkStyleFormatter,
                save: checkstyleXML
            }]
        }));
});



/*
 * target 要检查的目标文件（目录），glob 或者包含 globs 的数组。参考 https://github.com/isaacs/node-glob
 */
// var targetHtml = 'src/**/*.html';

// gulp.task('htmlcheck', function() {
//     var verboseLog = 'report' + Date.now() + '.log';
//     var checkstyleXML = 'htmlcs-_report_checkstyle-' + Date.now() + '.xml';
//     return gulp.src(targetHtml)
//         .pipe(htmlcs({
//             configFile: './checkrule/html/.htmlcsrc',
//             errorLevel: errorLevel,
//             failAfterError: false,
//             // 报告路径
//             reportOutputDir: './reports/html',
//             // 输出结果
//             reporters: [{ // 控制台输出
//                 formatter: 'verbose',
//                 console: true
//             }, { // 普通文本形式的文件
//                 formatter: 'verbose',
//                 save: verboseLog
//             }, { // checkstyle xml文件
//                 formatter: checkStyleFormatter,
//                 save: checkstyleXML
//             }]
//         }));
// });