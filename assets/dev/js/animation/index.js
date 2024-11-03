document.addEventListener("DOMContentLoaded", () => {
  let containerOffset = window.getComputedStyle(document.querySelector(".container"), null);
  containerOffset = containerOffset.getPropertyValue('padding-right').trim();
  containerOffset = Number(containerOffset.replace("px", ""));

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, CustomEase);

  CustomEase.create("cubicDefault", ".36,.3,0,1");

  function currentGSAP() {
    if (!isMobile.any()) {
      const smoother = ScrollSmoother.create({
        wrapper: ".wrapper",
        content: ".wrapper__content",
        smooth: 1.3
      });
    }

    // Пример использования функции LineByLineAnimation
    LineByLineAnimation(".hero", ".hero__content");
    LineByLineAnimation(".hero", ".hero__right");
    LineByLineAnimation(".stack", ".stack__title");
    LineByLineAnimation(".stack", ".swiper");
    LineByLineAnimation(".projects", ".h2");
    LineByLineAnimation(".projects", ".item");
    LineByLineAnimation(".about", ".about__title");
    LineByLineAnimation(".about", ".about__photo");
    LineByLineAnimation(".about", ".about__text");
    LineByLineAnimation(".courses", ".courses__title");
    LineByLineAnimation(".courses", ".courses__text");
    LineByLineAnimation(".courses", ".courses__item");
    LineByLineAnimation(".language", ".language__title");
    LineByLineAnimation(".language", ".language__item");
  }

  // Плавное появление сайта
  // allBodyFirstAnimation(".page__body");

  currentGSAP();
});
