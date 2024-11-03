import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import svgSprite from "gulp-svg-sprite";

export default function (gulp, config, paths) {
  gulp.task("sprite:svg", function () {
    return gulp.src(`${config.root}/dev/sprite/*.svg`)
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
          $("[fill-opacity]").removeAttr("fill-opacity");
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(replace("&gt;", ">"))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      }))
      .pipe(gulp.dest(`${config.root}/templates/img`))
  })
}
