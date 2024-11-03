function allBodyFirstAnimation(selector = ".page__body") {
  if (document.querySelector(selector)) {
    document.querySelectorAll(selector).forEach(section => {
      gsap.to(
        section,
        { opacity: 1, duration: mediumAnimationDuration, ease: "cubicDefault" }
      );
    });
  }
}
