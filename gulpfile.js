var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var webpack = require("gulp-webpack");
var rename = require("gulp-rename");

gulp.task("webpack", function () {
    return gulp.src('wwwroot/bootstrap.js')
    .pipe(webpack({
        resolve: {
            extensions: ["", ".js", ".ts"]
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/, loader: "ts", exclude: [/node_modules/]
                },
                {
                    test: /\.css$/, exclude: [/node_modules/], loader: "style-loader!css-loader"
                }
            ]
        }
    }))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest('wwwroot/'));
});

gulp.task('watch', function () {
    gulp.watch([
        './wwwroot/app/**/*.js'
    ], ['webpack']);
});

gulp.task('default', ['webpack', 'watch']);