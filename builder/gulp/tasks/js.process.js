import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";

export default function (gulp, config, paths) {
  gulp.task("js:process", function () {
    return gulp.src(paths.app)
      .pipe(sourcemaps.init())
      .pipe(concat("main.js"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${config.root}/templates/js`))
  })
}
