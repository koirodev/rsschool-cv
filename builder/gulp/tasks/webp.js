import webp from "gulp-webp";

export default function (gulp, config, paths) {
  gulp.task("gulp-webp", function () {
    return gulp.src(`${config.root}/dev/img/**/*.{jpg,jpeg,png}`, { encoding: false })
      .pipe(webp())
      .pipe(gulp.dest(`${config.root}/templates/img`))
  });
}
