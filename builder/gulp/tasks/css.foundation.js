export default function (gulp, config, paths) {
  gulp.task("css:foundation", function () {
    return gulp.src(paths.cssFoundation)
      .pipe(gulp.dest(`${config.root}/templates/css/modules/`))
  })
}
