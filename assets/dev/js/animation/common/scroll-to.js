document.addEventListener("DOMContentLoaded", function () {
  // Скролл до элемента
  if (document.querySelector("[data-scroll-to]")) {
    document.querySelectorAll("[data-scroll-to]").forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();

        gsap.to(window, {
          scrollTo: {
            y: `#${item.getAttribute("href").split("#")[1]}`,
            offsetY: document.querySelector("header.header").clientHeight + cssToNumber(rootStyles.getPropertyValue("--container-offset-outer").trim()),
            autoKill: false,
            duration: defaultAnimationDuration
          }
        }, `-=1`);

      });
    });
  }
});
