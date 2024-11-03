export default function (gulp, config, paths) {
  gulp.task("copy", function () {
    gulp.src(`${config.root}/dev/fonts/**/*.*`, { encoding: false })
      .pipe(gulp.dest(`${config.root}/templates/fonts`));
    gulp.src(`${config.root}/dev/img/*.*`, { encoding: false })
      .pipe(gulp.dest(`${config.root}/templates/img`));
    gulp.src(`${config.root}/dev/favicon/*.*`, { encoding: false })
      .pipe(gulp.dest(`${config.root}/templates/favicon`));
    return gulp.src(`${config.root}/dev/img/**/*.*`, { encoding: false })
      .pipe(gulp.dest(`${config.root}/templates/img`));
  });
}
