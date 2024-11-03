import gulp from "gulp";
import config from "./gulp/config.js";

import appPath from "./gulp/paths/app.js";
import cssPath from "./gulp/paths/css.foundation.js";
import jsPath from "./gulp/paths/js.foundation.js";
import tasksPath from "./gulp/paths/tasks.js";

const paths = {
  tasks: tasksPath,
  jsFoundation: jsPath,
  cssFoundation: cssPath,
  app: appPath
}

for (const taskPath of paths.tasks) {
  const task = await import(taskPath);
  task.default(gulp, config, paths);
}

const defaultTasks = [
  "sass-global",
  "js:foundation",
  "js:process",
  "css:foundation",
  "sprite:svg",
  "gulp-webp",
  "copy"
];

gulp.task("default", gulp.series(
  "clean",
  gulp.parallel(...defaultTasks),
  "watch"
));

gulp.task("prod", gulp.series(
  "clean",
  gulp.parallel(...defaultTasks)
));
