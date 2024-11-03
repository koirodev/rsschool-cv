
function setGlobalHeaderHeight() {
  document.querySelector("html").style.setProperty("--global-header-height", header.clientHeight + "px");
}

window.addEventListener("resize", function () {
  setGlobalHeaderHeight();
});

document.addEventListener("DOMContentLoaded", function () {
  setGlobalHeaderHeight();
});