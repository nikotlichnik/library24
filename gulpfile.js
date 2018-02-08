"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function () {
    gulp.src("scss/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
});

gulp.task("sprite", function () {
    return gulp.src(["img/logo.svg", "img/glasses.svg"])
        .pipe(svgstore(({inlineSvg: true})))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"))
});

gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"))
});

gulp.task("images", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            // imagemin.optipng({optimizationLevel: 3}),
            // imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("img"))
});

gulp.task("carousel", function () {
    gulp.src("scss/owlcarousel/owl.carousel.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
});

gulp.task("carouselTheme", function () {
    gulp.src("scss/owlcarousel/owl.theme.default.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
});

gulp.task("serve", function () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("scss/**/*.scss", ["style"]);
    gulp.watch("*.html", ["build"]);
    gulp.watch("js/**/*.js", ["build"]);
});

gulp.task("copy", function () {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**/*.js",
        "*.html"
    ], {
        base: "."
    })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("owl", function (done) {
    run("carousel", "carouselTheme", done);
});

gulp.task("build", function (done) {
    run("clean", "copy", "style", "owl", "sprite", "html", done);
});
