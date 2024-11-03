document.addEventListener("DOMContentLoaded", () => {
  let containerOffset = window.getComputedStyle(document.querySelector(".container"), null);
  containerOffset = containerOffset.getPropertyValue('padding-right').trim();
  containerOffset = Number(containerOffset.replace("px", ""));

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, CustomEase);

  CustomEase.create("cubicDefault", ".36,.3,0,1");

  function currentGSAP() {
    // if (!isMobile.any()) {
    //   const smoother = ScrollSmoother.create({
    //     wrapper: ".wrapper",
    //     content: ".wrapper__content",
    //     smooth: 1.3
    //   });
    // }

    // Пример использования функции LineByLineAnimation
    // LineByLineAnimation(".section", ".section__head");
  }

  // Плавное появление сайта
  // allBodyFirstAnimation(".page__body");

  currentGSAP();
});
