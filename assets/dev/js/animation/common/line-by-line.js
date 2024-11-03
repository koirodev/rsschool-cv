function LineByLineAnimation(selector = "[data-container-animation]", block = "[data-block-animation]", start = "100%") {
  if (document.querySelector(selector)) {
    document.querySelectorAll(selector).forEach(function (section) {

      if (section.querySelector(block)) {
        const localTL = gsap.timeline();

        section.querySelectorAll(block).forEach(function (block) {

          // Игнорируем блоки внутри .section-name
          // if (!!block.closest(".section-name")) return;

          gsap.fromTo(
            block,
            {
              opacity: 0,
              y: 70
            },
            {
              opacity: 1,
              y: 0,
              duration: longAnimationDuration,
              ease: "cubicDefault",
              scrollTrigger: {
                trigger: block,
                start: "top " + start,
                end: "bottom 0%",
                toggleActions: "play none none none",
                scrub: false
              }
            }
          );
        });
      }
    });
  }
}
