import sourcemaps from "gulp-sourcemaps";
import notify from "gulp-notify";
import rename from "gulp-rename";

import postcss from "gulp-postcss";
import postcssImport from "postcss-import";
import postcssMediaMinmax from "postcss-media-minmax";
import postcssIsPseudoClass from "@csstools/postcss-is-pseudo-class";
import postcssHasPseudoClass from "css-has-pseudo";
import postcssBlankPseudo from "css-blank-pseudo";
import postcssCQFill from "cqfill/postcss"
import sass from "@csstools/postcss-sass";
import autoprefixer from "autoprefixer";

export default function (gulp, config, paths) {
  const postcssPlugins = [
    sass({ silenceDeprecations: ["legacy-js-api", "import"] }),
    postcssImport(),
    postcssMediaMinmax(),
    postcssBlankPseudo({ preserve: false }),
    postcssIsPseudoClass({ preserve: false, onComplexSelector: "warning", onPseudoElement: "warning" }),
    postcssHasPseudoClass({ preserve: true }),
    postcssCQFill(),
    autoprefixer({ overrideBrowserslist: config.autoprefixerConfig })
  ]

  gulp.task("sass", function () {
    return gulp.src([`${config.root}/dev/scss/*/*/*/*.scss`, `!${config.root}/dev/scss/*/*/*/_*`])
      .pipe(sourcemaps.init())
      .pipe(postcss(postcssPlugins)).on("error", notify.onError({ title: "Style" }))
      .pipe(rename({ extname: ".css" }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${config.root}/templates/css/`));
  });

  gulp.task("sass-global", function () {
    return gulp.src(`${config.root}/dev/scss/main.scss`)
      .pipe(sourcemaps.init())
      .pipe(postcss(postcssPlugins))
      .on("error", notify.onError({ title: "Style" }))
      .pipe(rename({ extname: ".css" }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${config.root}/templates/css/`));
  });
}
