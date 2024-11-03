export default function (gulp, config, paths) {
  gulp.task("js:foundation", function () {
    return gulp.src(paths.jsFoundation)
      .pipe(gulp.dest(`${config.root}/templates/js/modules/`));
  })
}
