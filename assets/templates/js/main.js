class EliteAccordion {
  constructor(accordion) {
    this.animationDuration = 350; // Время анимации в миллисекундах из переменной --animation-duration
    this.accordion = accordion;
    this.hidden = this.accordion.querySelector("[data-accordion-hidden]");
    this.content = this.accordion.querySelector("[data-accordion-content]");
    this.current = this.accordion.querySelector("[data-accordion-current]");
    this.contentHeight = this.content.clientHeight;
    this.accordionIcon = null;
    this.iconHidden = null;
    this.IconShow = null;

    if (this.current.querySelector("[data-accordion-icon]")) {
      this.accordionIcon = this.current.querySelector("[data-accordion-icon]");

      let iconList = this.accordionIcon.getAttribute("data-accordion-icon");
      iconList = iconList.substring(1, iconList.length - 1);
      let iconArray = iconList.split(",");
      if (iconArray.length == 2) {
        this.iconHidden = iconArray[0].trim(),
          this.IconShow = iconArray[1].trim();
      } else {
        console.error("Invalid data-accordion-icon attribute");
      }

      this.accordionIcon.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  }

  replaceIcon(hidden = true) {
    if (!this.accordionIcon) {
      return;
    }

    if (!this.accordionIcon.querySelector("use")) {
      console.debug("No use tag found in the accordion icon");
      return;
    }

    if (hidden) {
      this.accordionIcon.querySelector("use")
        .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "/assets/templates/img/sprite.svg#" + this.iconHidden);
    } else {
      this.accordionIcon.querySelector("use")
        .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "/assets/templates/img/sprite.svg#" + this.IconShow);
    }
  }

  scrollIntoView() {
    this.content.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  show() {
    this.hidden.style.height = `${this.contentHeight}px`;
    this.accordion.classList.add("js-accordion-active");

    // Скролл к открытому аккордеону
    // this.scrollIntoView();

    setTimeout(() => {
      this.replaceIcon(false);
    }, this.animationDuration / 2);
  }

  hide() {
    this.hidden.style.height = "";
    this.accordion.classList.remove("js-accordion-active");

    setTimeout(() => {
      this.replaceIcon(true);
    }, this.animationDuration / 2);
  }

  toggle() {
    this.accordion.classList.contains("js-accordion-active") ? this.hide() : this.show();

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, this.animationDuration);
  }
}

function hideAllAccordions(closestObject) {
  closestObject.querySelectorAll("[data-accordion].js-accordion-active").forEach(function (activeAccordion) {
    if (activeAccordion != event.target.closest("[data-accordion]")) {
      const acc = new EliteAccordion(activeAccordion);
      acc.hide();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector("[data-accordion]")) {

    document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
      const acc = new EliteAccordion(accordion);

      acc.current.addEventListener("click", function (event) {
        if (acc.current.closest("[data-accordion-content]")) {
          const parentContent = acc.current.closest("[data-accordion-hidden]");

          if (accordion.classList.contains("js-accordion-active")) {
            acc.hide();
            parentContent.style.height = `${parentContent.clientHeight - acc.contentHeight}px`;
          } else {
            acc.show();
            parentContent.style.height = `${parentContent.clientHeight + acc.contentHeight}px`;
          }

          return;
        }

        if (acc.current.closest("[data-accordion-not-close]")) {
          acc.toggle();
          return;
        }

        if (acc.current.closest("[data-accordion-container]")) {
          hideAllAccordions(acc.current.closest("[data-accordion-container]"));
        } else if (acc.current.closest(".section")) {
          hideAllAccordions(acc.current.closest(".section"));
        }
        acc.toggle();
      });

      if (accordion.classList.contains("js-accordion-active")) {
        acc.show();
      }
    });
  }
});
var menu = document.querySelector('.burger-menu');

function burgerMenu(button) {
  if (!button.classList.contains('burger_active')) {
    fixScroll(true);
    button.classList.add('burger_active');
    menu.classList.add('burger-menu_active');
    setTimeout(() => {
      document.querySelectorAll('[data-slow]').forEach(item => {
        item.classList.add('nav__item_slow');
      });
    }, 100);
  } else {
    closeBurgerMenu();
  }
}

function closeBurgerMenu() {
  fixScroll(false);
  document.querySelectorAll('[data-slow]').forEach(item => {
    item.classList.remove('nav__item_slow');
  });
  setTimeout(() => {
    document.querySelector('.burger').classList.remove('burger_active');
    menu.classList.remove('burger-menu_active');
  }, 100);
}

function fixScroll(bool) {
  const body = document.querySelector('body');
  if (bool) {
    body.classList.add('disable-scroll');
    body.style.paddingRight = `${getScrollBarWidth()}px`;
  } else {
    body.classList.remove('disable-scroll');
    body.style.paddingRight = `0px`;
  }
}

document.querySelector('[data-layer]').addEventListener('click', () => {
  closeBurgerMenu();
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeBurgerMenu();
  });
});
var shortAnimationDuration = 0.2;
var defaultAnimationDuration = 0.35;
var mediumAnimationDuration = 0.45;
var longAnimationDuration = 0.7;

/*
╭─────────────────ЗаметОчка──────────────────╮
│                                            │
│        Заменить запросы в media.scss       │
│                                            │
╰────────────────────────────────────────────╯
*/
var media = {
  mobile: 630,
  tablet: 1250,
  laptop: 1700,
  desktop: 2200
}

var rootStyles = getComputedStyle(document.documentElement);

var header = document.querySelector("header.header");

/*
╭─────────────────ЗаметОчка──────────────────╮
│                                            │
│        Проверка на ширину скроллбара       │
│                                            │
╰────────────────────────────────────────────╯
*/
function getScrollBarWidth() {
  let a, b;
  document.body.style.setProperty("overflow", "auto");
  a = startSize = document.body.clientWidth;
  document.body.style.setProperty("overflow", "hidden");
  b = endSize = document.body.clientWidth;
  document.body.style.removeProperty("overflow");
  return b - a;
}

/*
╭─────────────────ЗаметОчка──────────────────╮
│                                            │
│       true/false на наличие скролла        │
│                                            │
╰────────────────────────────────────────────╯
*/
function getScroll(a/**/, e = d.documentElement, d/*📄*/ = document, b/*🤷‍♂️*/ = d.body,) {
  return /CSS/.test(d.compatMode) ? (e["client" + a] < e["scroll" + a]) : (b["client" + a] < b[a])
}

/*
╭─────────────────ЗаметОчка──────────────────╮
│                                            │
│     Базовая обработка величин в number     │
│                                            │
╰────────────────────────────────────────────╯
*/
function cssToNumber(value) {
  if (value.endsWith("rem")) {
    return parseFloat(value) * parseFloat(getComputedStyle(document.documentElement).fontSize);
  } else if (value.endsWith("vw")) {
    return parseFloat(value) * 2560 / 100;
  } else if (value.endsWith("px")) {
    return parseFloat(value);
  }
  return parseFloat(value);
}

/*
╭─────────────────ЗаметОчка──────────────────╮
│                                            │
│      Оптимизация повторяющихся функций     │
│                                            │
╰────────────────────────────────────────────╯
*/
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }
}

document.addEventListener("DOMContentLoaded", function () {

  document.addEventListener("DOMContentLoaded", () => {

  });
  
});

new Swiper(".stack__swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: false,
  preventClicks: true,
  slidesPerGroupAuto: true,
  autoHeight: false,
  grabCursor: true,
  centerInsufficientSlides: false,
  speed: 500
});
document.addEventListener("DOMContentLoaded", function () {

  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
    Carousel: {
      infinite: false,
      transition: "slide",
    },
  });

  Fancybox.bind("[data-modal]", {
    autoFocus: false,
    // Это для отключения закрытия перетаскиванием
    dragToClose: false,
    Carousel: {
      Panzoom: {
        touch: false,
      }
    }
  });

  document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", function () {
      Fancybox.close();
    });
  });
});


function setGlobalHeaderHeight() {
  document.querySelector("html").style.setProperty("--global-header-height", header.clientHeight + "px");
}

window.addEventListener("resize", function () {
  setGlobalHeaderHeight();
});

document.addEventListener("DOMContentLoaded", function () {
  setGlobalHeaderHeight();
});
isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
}

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

document.addEventListener("DOMContentLoaded", function () {
  cssHasPseudo(document, { forcePolyfill: false, hover: true });
  cssBlankPseudoInit({ force: true });
});

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImJ1cmdlci5qcyIsImNvbW1vbi5qcyIsImZhbmN5Ym94LmpzIiwiaGVhZGVyLmpzIiwiaXNNb2JpbGUuanMiLCJhbmltYXRpb24vaW5kZXguanMiLCJwb3N0Y3NzL3BvbHlmaWxscy5qcyIsImFuaW1hdGlvbi9jb21tb24vYm9keS5qcyIsImFuaW1hdGlvbi9jb21tb24vbGluZS1ieS1saW5lLmpzIiwiYW5pbWF0aW9uL2NvbW1vbi9zY3JvbGwtdG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVsaXRlQWNjb3JkaW9uIHtcbiAgY29uc3RydWN0b3IoYWNjb3JkaW9uKSB7XG4gICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IDM1MDsgLy8g0JLRgNC10LzRjyDQsNC90LjQvNCw0YbQuNC4INCyINC80LjQu9C70LjRgdC10LrRg9C90LTQsNGFINC40Lcg0L/QtdGA0LXQvNC10L3QvdC+0LkgLS1hbmltYXRpb24tZHVyYXRpb25cbiAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcbiAgICB0aGlzLmhpZGRlbiA9IHRoaXMuYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24taGlkZGVuXVwiKTtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmFjY29yZGlvbi5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRlbnRdXCIpO1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24tY3VycmVudF1cIik7XG4gICAgdGhpcy5jb250ZW50SGVpZ2h0ID0gdGhpcy5jb250ZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLmFjY29yZGlvbkljb24gPSBudWxsO1xuICAgIHRoaXMuaWNvbkhpZGRlbiA9IG51bGw7XG4gICAgdGhpcy5JY29uU2hvdyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24taWNvbl1cIikpIHtcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbiA9IHRoaXMuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uLWljb25dXCIpO1xuXG4gICAgICBsZXQgaWNvbkxpc3QgPSB0aGlzLmFjY29yZGlvbkljb24uZ2V0QXR0cmlidXRlKFwiZGF0YS1hY2NvcmRpb24taWNvblwiKTtcbiAgICAgIGljb25MaXN0ID0gaWNvbkxpc3Quc3Vic3RyaW5nKDEsIGljb25MaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgbGV0IGljb25BcnJheSA9IGljb25MaXN0LnNwbGl0KFwiLFwiKTtcbiAgICAgIGlmIChpY29uQXJyYXkubGVuZ3RoID09IDIpIHtcbiAgICAgICAgdGhpcy5pY29uSGlkZGVuID0gaWNvbkFycmF5WzBdLnRyaW0oKSxcbiAgICAgICAgICB0aGlzLkljb25TaG93ID0gaWNvbkFycmF5WzFdLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIGRhdGEtYWNjb3JkaW9uLWljb24gYXR0cmlidXRlXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjY29yZGlvbkljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVwbGFjZUljb24oaGlkZGVuID0gdHJ1ZSkge1xuICAgIGlmICghdGhpcy5hY2NvcmRpb25JY29uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmFjY29yZGlvbkljb24ucXVlcnlTZWxlY3RvcihcInVzZVwiKSkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIk5vIHVzZSB0YWcgZm91bmQgaW4gdGhlIGFjY29yZGlvbiBpY29uXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChoaWRkZW4pIHtcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbi5xdWVyeVNlbGVjdG9yKFwidXNlXCIpXG4gICAgICAgIC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgXCIvYXNzZXRzL3RlbXBsYXRlcy9pbWcvc3ByaXRlLnN2ZyNcIiArIHRoaXMuaWNvbkhpZGRlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbi5xdWVyeVNlbGVjdG9yKFwidXNlXCIpXG4gICAgICAgIC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgXCIvYXNzZXRzL3RlbXBsYXRlcy9pbWcvc3ByaXRlLnN2ZyNcIiArIHRoaXMuSWNvblNob3cpO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCkge1xuICAgIHRoaXMuY29udGVudC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICAgIGJsb2NrOiBcInN0YXJ0XCIsXG4gICAgICBpbmxpbmU6IFwibmVhcmVzdFwiXG4gICAgfSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuaGlkZGVuLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuY29udGVudEhlaWdodH1weGA7XG4gICAgdGhpcy5hY2NvcmRpb24uY2xhc3NMaXN0LmFkZChcImpzLWFjY29yZGlvbi1hY3RpdmVcIik7XG5cbiAgICAvLyDQodC60YDQvtC70Lsg0Log0L7RgtC60YDRi9GC0L7QvNGDINCw0LrQutC+0YDQtNC10L7QvdGDXG4gICAgLy8gdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlcGxhY2VJY29uKGZhbHNlKTtcbiAgICB9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uIC8gMik7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuaGlkZGVuLnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgdGhpcy5hY2NvcmRpb24uY2xhc3NMaXN0LnJlbW92ZShcImpzLWFjY29yZGlvbi1hY3RpdmVcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVwbGFjZUljb24odHJ1ZSk7XG4gICAgfSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbiAvIDIpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuYWNjb3JkaW9uLmNsYXNzTGlzdC5jb250YWlucyhcImpzLWFjY29yZGlvbi1hY3RpdmVcIikgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcbiAgICB9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoaWRlQWxsQWNjb3JkaW9ucyhjbG9zZXN0T2JqZWN0KSB7XG4gIGNsb3Nlc3RPYmplY3QucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWFjY29yZGlvbl0uanMtYWNjb3JkaW9uLWFjdGl2ZVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChhY3RpdmVBY2NvcmRpb24pIHtcbiAgICBpZiAoYWN0aXZlQWNjb3JkaW9uICE9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uXVwiKSkge1xuICAgICAgY29uc3QgYWNjID0gbmV3IEVsaXRlQWNjb3JkaW9uKGFjdGl2ZUFjY29yZGlvbik7XG4gICAgICBhY2MuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uXVwiKSkge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWFjY29yZGlvbl1cIikuZm9yRWFjaChmdW5jdGlvbiAoYWNjb3JkaW9uKSB7XG4gICAgICBjb25zdCBhY2MgPSBuZXcgRWxpdGVBY2NvcmRpb24oYWNjb3JkaW9uKTtcblxuICAgICAgYWNjLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoYWNjLmN1cnJlbnQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbi1jb250ZW50XVwiKSkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudENvbnRlbnQgPSBhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWhpZGRlbl1cIik7XG5cbiAgICAgICAgICBpZiAoYWNjb3JkaW9uLmNsYXNzTGlzdC5jb250YWlucyhcImpzLWFjY29yZGlvbi1hY3RpdmVcIikpIHtcbiAgICAgICAgICAgIGFjYy5oaWRlKCk7XG4gICAgICAgICAgICBwYXJlbnRDb250ZW50LnN0eWxlLmhlaWdodCA9IGAke3BhcmVudENvbnRlbnQuY2xpZW50SGVpZ2h0IC0gYWNjLmNvbnRlbnRIZWlnaHR9cHhgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Muc2hvdygpO1xuICAgICAgICAgICAgcGFyZW50Q29udGVudC5zdHlsZS5oZWlnaHQgPSBgJHtwYXJlbnRDb250ZW50LmNsaWVudEhlaWdodCArIGFjYy5jb250ZW50SGVpZ2h0fXB4YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWNjLmN1cnJlbnQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbi1ub3QtY2xvc2VdXCIpKSB7XG4gICAgICAgICAgYWNjLnRvZ2dsZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRhaW5lcl1cIikpIHtcbiAgICAgICAgICBoaWRlQWxsQWNjb3JkaW9ucyhhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRhaW5lcl1cIikpO1xuICAgICAgICB9IGVsc2UgaWYgKGFjYy5jdXJyZW50LmNsb3Nlc3QoXCIuc2VjdGlvblwiKSkge1xuICAgICAgICAgIGhpZGVBbGxBY2NvcmRpb25zKGFjYy5jdXJyZW50LmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgYWNjLnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChhY2NvcmRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtYWNjb3JkaW9uLWFjdGl2ZVwiKSkge1xuICAgICAgICBhY2Muc2hvdygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTsiLCJ2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXItbWVudScpO1xyXG5cclxuZnVuY3Rpb24gYnVyZ2VyTWVudShidXR0b24pIHtcclxuICBpZiAoIWJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlcl9hY3RpdmUnKSkge1xyXG4gICAgZml4U2Nyb2xsKHRydWUpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J1cmdlcl9hY3RpdmUnKTtcclxuICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnYnVyZ2VyLW1lbnVfYWN0aXZlJyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xvd10nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnbmF2X19pdGVtX3Nsb3cnKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAxMDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjbG9zZUJ1cmdlck1lbnUoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlQnVyZ2VyTWVudSgpIHtcclxuICBmaXhTY3JvbGwoZmFsc2UpO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsb3ddJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19pdGVtX3Nsb3cnKTtcclxuICB9KTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdidXJnZXJfYWN0aXZlJyk7XHJcbiAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2J1cmdlci1tZW51X2FjdGl2ZScpO1xyXG4gIH0sIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeFNjcm9sbChib29sKSB7XHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICBpZiAoYm9vbCkge1xyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtnZXRTY3JvbGxCYXJXaWR0aCgpfXB4YDtcclxuICB9IGVsc2Uge1xyXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgMHB4YDtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxheWVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNsb3NlQnVyZ2VyTWVudSgpO1xyXG59KTtcclxuXHJcbm1lbnUucXVlcnlTZWxlY3RvckFsbCgnYScpLmZvckVhY2gobGluayA9PiB7XHJcbiAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsb3NlQnVyZ2VyTWVudSgpO1xyXG4gIH0pO1xyXG59KTsiLCJ2YXIgc2hvcnRBbmltYXRpb25EdXJhdGlvbiA9IDAuMjtcbnZhciBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb24gPSAwLjM1O1xudmFyIG1lZGl1bUFuaW1hdGlvbkR1cmF0aW9uID0gMC40NTtcbnZhciBsb25nQW5pbWF0aW9uRHVyYXRpb24gPSAwLjc7XG5cbi8qXG7ila3ilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDQl9Cw0LzQtdGC0J7Rh9C60LDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila5cbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilIIgICAgICAgINCX0LDQvNC10L3QuNGC0Ywg0LfQsNC/0YDQvtGB0Ysg0LIgbWVkaWEuc2NzcyAgICAgICDilIJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cbiovXG52YXIgbWVkaWEgPSB7XG4gIG1vYmlsZTogNjMwLFxuICB0YWJsZXQ6IDEyNTAsXG4gIGxhcHRvcDogMTcwMCxcbiAgZGVza3RvcDogMjIwMFxufVxuXG52YXIgcm9vdFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxudmFyIGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIuaGVhZGVyXCIpO1xuXG4vKlxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pSCICAgICAgICDQn9GA0L7QstC10YDQutCwINC90LAg0YjQuNGA0LjQvdGDINGB0LrRgNC+0LvQu9Cx0LDRgNCwICAgICAgIOKUglxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKVsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVr1xuKi9cbmZ1bmN0aW9uIGdldFNjcm9sbEJhcldpZHRoKCkge1xuICBsZXQgYSwgYjtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eShcIm92ZXJmbG93XCIsIFwiYXV0b1wiKTtcbiAgYSA9IHN0YXJ0U2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcbiAgYiA9IGVuZFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gIHJldHVybiBiIC0gYTtcbn1cblxuLypcbuKVreKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgNCX0LDQvNC10YLQntGH0LrQsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVrlxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKUgiAgICAgICB0cnVlL2ZhbHNlINC90LAg0L3QsNC70LjRh9C40LUg0YHQutGA0L7Qu9C70LAgICAgICAgIOKUglxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKVsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVr1xuKi9cbmZ1bmN0aW9uIGdldFNjcm9sbChhLyoqLywgZSA9IGQuZG9jdW1lbnRFbGVtZW50LCBkLyrwn5OEKi8gPSBkb2N1bWVudCwgYi8q8J+kt+KAjeKZgu+4jyovID0gZC5ib2R5LCkge1xuICByZXR1cm4gL0NTUy8udGVzdChkLmNvbXBhdE1vZGUpID8gKGVbXCJjbGllbnRcIiArIGFdIDwgZVtcInNjcm9sbFwiICsgYV0pIDogKGJbXCJjbGllbnRcIiArIGFdIDwgYlthXSlcbn1cblxuLypcbuKVreKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgNCX0LDQvNC10YLQntGH0LrQsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVrlxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKUgiAgICAg0JHQsNC30L7QstCw0Y8g0L7QsdGA0LDQsdC+0YLQutCwINCy0LXQu9C40YfQuNC9INCyIG51bWJlciAgICAg4pSCXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pWw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWvXG4qL1xuZnVuY3Rpb24gY3NzVG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHZhbHVlLmVuZHNXaXRoKFwicmVtXCIpKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpICogcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuZm9udFNpemUpO1xuICB9IGVsc2UgaWYgKHZhbHVlLmVuZHNXaXRoKFwidndcIikpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgKiAyNTYwIC8gMTAwO1xuICB9IGVsc2UgaWYgKHZhbHVlLmVuZHNXaXRoKFwicHhcIikpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xufVxuXG4vKlxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pSCICAgICAg0J7Qv9GC0LjQvNC40LfQsNGG0LjRjyDQv9C+0LLRgtC+0YDRj9GO0YnQuNGF0YHRjyDRhNGD0L3QutGG0LjQuSAgICAg4pSCXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pWw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWvXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuICBsZXQgdGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMuYXBwbHkodGhpcywgYXJncyksIHdhaXQpO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgfSk7XG4gIFxufSk7XG5cbm5ldyBTd2lwZXIoXCIuc3RhY2tfX3N3aXBlclwiLCB7XG4gIG5hdmlnYXRpb246IHtcbiAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gIH0sXG4gIHNsaWRlc1BlclZpZXc6IFwiYXV0b1wiLFxuICBzcGFjZUJldHdlZW46IDIwLFxuICBsb29wOiBmYWxzZSxcbiAgcHJldmVudENsaWNrczogdHJ1ZSxcbiAgc2xpZGVzUGVyR3JvdXBBdXRvOiB0cnVlLFxuICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBmYWxzZSxcbiAgc3BlZWQ6IDUwMFxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICBGYW5jeWJveC5iaW5kKFwiW2RhdGEtZmFuY3lib3hdXCIsIHtcclxuICAgIFRodW1iczogZmFsc2UsXHJcbiAgICBUb29sYmFyOiB7XHJcbiAgICAgIGRpc3BsYXk6IHtcclxuICAgICAgICBsZWZ0OiBbXSxcclxuICAgICAgICBtaWRkbGU6IFtdLFxyXG4gICAgICAgIHJpZ2h0OiBbXCJjbG9zZVwiXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBDYXJvdXNlbDoge1xyXG4gICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgIHRyYW5zaXRpb246IFwic2xpZGVcIixcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIEZhbmN5Ym94LmJpbmQoXCJbZGF0YS1tb2RhbF1cIiwge1xyXG4gICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgIC8vINCt0YLQviDQtNC70Y8g0L7RgtC60LvRjtGH0LXQvdC40Y8g0LfQsNC60YDRi9GC0LjRjyDQv9C10YDQtdGC0LDRgdC60LjQstCw0L3QuNC10LxcclxuICAgIGRyYWdUb0Nsb3NlOiBmYWxzZSxcclxuICAgIENhcm91c2VsOiB7XHJcbiAgICAgIFBhbnpvb206IHtcclxuICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW1vZGFsXVwiKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgRmFuY3lib3guY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIiwiXG5mdW5jdGlvbiBzZXRHbG9iYWxIZWFkZXJIZWlnaHQoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLnN0eWxlLnNldFByb3BlcnR5KFwiLS1nbG9iYWwtaGVhZGVyLWhlaWdodFwiLCBoZWFkZXIuY2xpZW50SGVpZ2h0ICsgXCJweFwiKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICBzZXRHbG9iYWxIZWFkZXJIZWlnaHQoKTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHNldEdsb2JhbEhlYWRlckhlaWdodCgpO1xufSk7IiwiaXNNb2JpbGUgPSB7XHJcbiAgQW5kcm9pZDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSk7XHJcbiAgfSxcclxuICBCbGFja0JlcnJ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKTtcclxuICB9LFxyXG4gIGlPUzogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvaSk7XHJcbiAgfSxcclxuICBPcGVyYTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL09wZXJhIE1pbmkvaSk7XHJcbiAgfSxcclxuICBXaW5kb3dzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvaSk7XHJcbiAgfSxcclxuICBhbnk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoaXNNb2JpbGUuQW5kcm9pZCgpIHx8IGlzTW9iaWxlLkJsYWNrQmVycnkoKSB8fCBpc01vYmlsZS5pT1MoKSB8fCBpc01vYmlsZS5PcGVyYSgpIHx8IGlzTW9iaWxlLldpbmRvd3MoKSk7XHJcbiAgfVxyXG59XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgbGV0IGNvbnRhaW5lck9mZnNldCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpLCBudWxsKTtcbiAgY29udGFpbmVyT2Zmc2V0ID0gY29udGFpbmVyT2Zmc2V0LmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKS50cmltKCk7XG4gIGNvbnRhaW5lck9mZnNldCA9IE51bWJlcihjb250YWluZXJPZmZzZXQucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcblxuICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFNtb290aGVyLCBTY3JvbGxUb1BsdWdpbiwgQ3VzdG9tRWFzZSk7XG5cbiAgQ3VzdG9tRWFzZS5jcmVhdGUoXCJjdWJpY0RlZmF1bHRcIiwgXCIuMzYsLjMsMCwxXCIpO1xuXG4gIGZ1bmN0aW9uIGN1cnJlbnRHU0FQKCkge1xuICAgIGlmICghaXNNb2JpbGUuYW55KCkpIHtcbiAgICAgIGNvbnN0IHNtb290aGVyID0gU2Nyb2xsU21vb3RoZXIuY3JlYXRlKHtcbiAgICAgICAgd3JhcHBlcjogXCIud3JhcHBlclwiLFxuICAgICAgICBjb250ZW50OiBcIi53cmFwcGVyX19jb250ZW50XCIsXG4gICAgICAgIHNtb290aDogMS4zXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDQn9GA0LjQvNC10YAg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YTRg9C90LrRhtC40LggTGluZUJ5TGluZUFuaW1hdGlvblxuICAgIExpbmVCeUxpbmVBbmltYXRpb24oXCIuaGVyb1wiLCBcIi5oZXJvX19jb250ZW50XCIpO1xuICAgIExpbmVCeUxpbmVBbmltYXRpb24oXCIuaGVyb1wiLCBcIi5oZXJvX19yaWdodFwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLnN0YWNrXCIsIFwiLnN0YWNrX190aXRsZVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLnN0YWNrXCIsIFwiLnN3aXBlclwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLnByb2plY3RzXCIsIFwiLmgyXCIpO1xuICAgIExpbmVCeUxpbmVBbmltYXRpb24oXCIucHJvamVjdHNcIiwgXCIuaXRlbVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmFib3V0XCIsIFwiLmFib3V0X190aXRsZVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmFib3V0XCIsIFwiLmFib3V0X19waG90b1wiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmFib3V0XCIsIFwiLmFib3V0X190ZXh0XCIpO1xuICAgIExpbmVCeUxpbmVBbmltYXRpb24oXCIuY291cnNlc1wiLCBcIi5jb3Vyc2VzX190aXRsZVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmNvdXJzZXNcIiwgXCIuY291cnNlc19fdGV4dFwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmNvdXJzZXNcIiwgXCIuY291cnNlc19faXRlbVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmxhbmd1YWdlXCIsIFwiLmxhbmd1YWdlX190aXRsZVwiKTtcbiAgICBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLmxhbmd1YWdlXCIsIFwiLmxhbmd1YWdlX19pdGVtXCIpO1xuICB9XG5cbiAgLy8g0J/Qu9Cw0LLQvdC+0LUg0L/QvtGP0LLQu9C10L3QuNC1INGB0LDQudGC0LBcbiAgLy8gYWxsQm9keUZpcnN0QW5pbWF0aW9uKFwiLnBhZ2VfX2JvZHlcIik7XG5cbiAgY3VycmVudEdTQVAoKTtcbn0pO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGNzc0hhc1BzZXVkbyhkb2N1bWVudCwgeyBmb3JjZVBvbHlmaWxsOiBmYWxzZSwgaG92ZXI6IHRydWUgfSk7XHJcbiAgY3NzQmxhbmtQc2V1ZG9Jbml0KHsgZm9yY2U6IHRydWUgfSk7XHJcbn0pO1xyXG4iLCJmdW5jdGlvbiBhbGxCb2R5Rmlyc3RBbmltYXRpb24oc2VsZWN0b3IgPSBcIi5wYWdlX19ib2R5XCIpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgIGdzYXAudG8oXHJcbiAgICAgICAgc2VjdGlvbixcclxuICAgICAgICB7IG9wYWNpdHk6IDEsIGR1cmF0aW9uOiBtZWRpdW1BbmltYXRpb25EdXJhdGlvbiwgZWFzZTogXCJjdWJpY0RlZmF1bHRcIiB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gTGluZUJ5TGluZUFuaW1hdGlvbihzZWxlY3RvciA9IFwiW2RhdGEtY29udGFpbmVyLWFuaW1hdGlvbl1cIiwgYmxvY2sgPSBcIltkYXRhLWJsb2NrLWFuaW1hdGlvbl1cIiwgc3RhcnQgPSBcIjEwMCVcIikge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG5cbiAgICAgIGlmIChzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoYmxvY2spKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsVEwgPSBnc2FwLnRpbWVsaW5lKCk7XG5cbiAgICAgICAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKGJsb2NrKS5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuXG4gICAgICAgICAgLy8g0JjQs9C90L7RgNC40YDRg9C10Lwg0LHQu9C+0LrQuCDQstC90YPRgtGA0LggLnNlY3Rpb24tbmFtZVxuICAgICAgICAgIC8vIGlmICghIWJsb2NrLmNsb3Nlc3QoXCIuc2VjdGlvbi1uYW1lXCIpKSByZXR1cm47XG5cbiAgICAgICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgICAgIGJsb2NrLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICB5OiA3MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgZHVyYXRpb246IGxvbmdBbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgICAgZWFzZTogXCJjdWJpY0RlZmF1bHRcIixcbiAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGJsb2NrLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBcIiArIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogXCJib3R0b20gMCVcIixcbiAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIG5vbmVcIixcbiAgICAgICAgICAgICAgICBzY3J1YjogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0KHQutGA0L7Qu9C7INC00L4g0Y3Qu9C10LzQtdC90YLQsFxyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2Nyb2xsLXRvXVwiKSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXNjcm9sbC10b11cIikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBnc2FwLnRvKHdpbmRvdywge1xyXG4gICAgICAgICAgc2Nyb2xsVG86IHtcclxuICAgICAgICAgICAgeTogYCMke2l0ZW0uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5zcGxpdChcIiNcIilbMV19YCxcclxuICAgICAgICAgICAgb2Zmc2V0WTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlci5oZWFkZXJcIikuY2xpZW50SGVpZ2h0ICsgY3NzVG9OdW1iZXIocm9vdFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1jb250YWluZXItb2Zmc2V0LW91dGVyXCIpLnRyaW0oKSksXHJcbiAgICAgICAgICAgIGF1dG9LaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgZHVyYXRpb246IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGAtPTFgKTtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuIl19
