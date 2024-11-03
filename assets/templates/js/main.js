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
  // Фикс зума к инпутам на мобильных
  const metaViewport = document.querySelector("meta[name=viewport]");
  metaViewport.setAttribute("content", `${metaViewport.getAttribute("content")}, maximum-scale=1.0`);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImJ1cmdlci5qcyIsImNvbW1vbi5qcyIsImZhbmN5Ym94LmpzIiwiaXNNb2JpbGUuanMiLCJhbmltYXRpb24vaW5kZXguanMiLCJwb3N0Y3NzL3BvbHlmaWxscy5qcyIsImFuaW1hdGlvbi9jb21tb24vYm9keS5qcyIsImFuaW1hdGlvbi9jb21tb24vbGluZS1ieS1saW5lLmpzIiwiYW5pbWF0aW9uL2NvbW1vbi9zY3JvbGwtdG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVsaXRlQWNjb3JkaW9uIHtcclxuICBjb25zdHJ1Y3RvcihhY2NvcmRpb24pIHtcclxuICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSAzNTA7IC8vINCS0YDQtdC80Y8g0LDQvdC40LzQsNGG0LjQuCDQsiDQvNC40LvQu9C40YHQtdC60YPQvdC00LDRhSDQuNC3INC/0LXRgNC10LzQtdC90L3QvtC5IC0tYW5pbWF0aW9uLWR1cmF0aW9uXHJcbiAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcclxuICAgIHRoaXMuaGlkZGVuID0gdGhpcy5hY2NvcmRpb24ucXVlcnlTZWxlY3RvcihcIltkYXRhLWFjY29yZGlvbi1oaWRkZW5dXCIpO1xyXG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5hY2NvcmRpb24ucXVlcnlTZWxlY3RvcihcIltkYXRhLWFjY29yZGlvbi1jb250ZW50XVwiKTtcclxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24tY3VycmVudF1cIik7XHJcbiAgICB0aGlzLmNvbnRlbnRIZWlnaHQgPSB0aGlzLmNvbnRlbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgdGhpcy5hY2NvcmRpb25JY29uID0gbnVsbDtcclxuICAgIHRoaXMuaWNvbkhpZGRlbiA9IG51bGw7XHJcbiAgICB0aGlzLkljb25TaG93ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24taWNvbl1cIikpIHtcclxuICAgICAgdGhpcy5hY2NvcmRpb25JY29uID0gdGhpcy5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24taWNvbl1cIik7XHJcblxyXG4gICAgICBsZXQgaWNvbkxpc3QgPSB0aGlzLmFjY29yZGlvbkljb24uZ2V0QXR0cmlidXRlKFwiZGF0YS1hY2NvcmRpb24taWNvblwiKTtcclxuICAgICAgaWNvbkxpc3QgPSBpY29uTGlzdC5zdWJzdHJpbmcoMSwgaWNvbkxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgIGxldCBpY29uQXJyYXkgPSBpY29uTGlzdC5zcGxpdChcIixcIik7XHJcbiAgICAgIGlmIChpY29uQXJyYXkubGVuZ3RoID09IDIpIHtcclxuICAgICAgICB0aGlzLmljb25IaWRkZW4gPSBpY29uQXJyYXlbMF0udHJpbSgpLFxyXG4gICAgICAgICAgdGhpcy5JY29uU2hvdyA9IGljb25BcnJheVsxXS50cmltKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgZGF0YS1hY2NvcmRpb24taWNvbiBhdHRyaWJ1dGVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXBsYWNlSWNvbihoaWRkZW4gPSB0cnVlKSB7XHJcbiAgICBpZiAoIXRoaXMuYWNjb3JkaW9uSWNvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmFjY29yZGlvbkljb24ucXVlcnlTZWxlY3RvcihcInVzZVwiKSkge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKFwiTm8gdXNlIHRhZyBmb3VuZCBpbiB0aGUgYWNjb3JkaW9uIGljb25cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGlkZGVuKSB7XHJcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbi5xdWVyeVNlbGVjdG9yKFwidXNlXCIpXHJcbiAgICAgICAgLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3hsaW5rOmhyZWYnLCBcIi9hc3NldHMvdGVtcGxhdGVzL2ltZy9zcHJpdGUuc3ZnI1wiICsgdGhpcy5pY29uSGlkZGVuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbi5xdWVyeVNlbGVjdG9yKFwidXNlXCIpXHJcbiAgICAgICAgLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3hsaW5rOmhyZWYnLCBcIi9hc3NldHMvdGVtcGxhdGVzL2ltZy9zcHJpdGUuc3ZnI1wiICsgdGhpcy5JY29uU2hvdyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY3JvbGxJbnRvVmlldygpIHtcclxuICAgIHRoaXMuY29udGVudC5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgICBibG9jazogXCJzdGFydFwiLFxyXG4gICAgICBpbmxpbmU6IFwibmVhcmVzdFwiXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLmhpZGRlbi5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmNvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5hY2NvcmRpb24uY2xhc3NMaXN0LmFkZChcImpzLWFjY29yZGlvbi1hY3RpdmVcIik7XHJcblxyXG4gICAgLy8g0KHQutGA0L7Qu9C7INC6INC+0YLQutGA0YvRgtC+0LzRgyDQsNC60LrQvtGA0LTQtdC+0L3Rg1xyXG4gICAgLy8gdGhpcy5zY3JvbGxJbnRvVmlldygpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlcGxhY2VJY29uKGZhbHNlKTtcclxuICAgIH0sIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gLyAyKTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLmhpZGRlbi5zdHlsZS5oZWlnaHQgPSBcIlwiO1xyXG4gICAgdGhpcy5hY2NvcmRpb24uY2xhc3NMaXN0LnJlbW92ZShcImpzLWFjY29yZGlvbi1hY3RpdmVcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVwbGFjZUljb24odHJ1ZSk7XHJcbiAgICB9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uIC8gMik7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLmFjY29yZGlvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1hY2NvcmRpb24tYWN0aXZlXCIpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbiAgICB9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVBbGxBY2NvcmRpb25zKGNsb3Nlc3RPYmplY3QpIHtcclxuICBjbG9zZXN0T2JqZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1hY2NvcmRpb25dLmpzLWFjY29yZGlvbi1hY3RpdmVcIikuZm9yRWFjaChmdW5jdGlvbiAoYWN0aXZlQWNjb3JkaW9uKSB7XHJcbiAgICBpZiAoYWN0aXZlQWNjb3JkaW9uICE9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uXVwiKSkge1xyXG4gICAgICBjb25zdCBhY2MgPSBuZXcgRWxpdGVBY2NvcmRpb24oYWN0aXZlQWNjb3JkaW9uKTtcclxuICAgICAgYWNjLmhpZGUoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWFjY29yZGlvbl1cIikpIHtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtYWNjb3JkaW9uXVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChhY2NvcmRpb24pIHtcclxuICAgICAgY29uc3QgYWNjID0gbmV3IEVsaXRlQWNjb3JkaW9uKGFjY29yZGlvbik7XHJcblxyXG4gICAgICBhY2MuY3VycmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGFjYy5jdXJyZW50LmNsb3Nlc3QoXCJbZGF0YS1hY2NvcmRpb24tY29udGVudF1cIikpIHtcclxuICAgICAgICAgIGNvbnN0IHBhcmVudENvbnRlbnQgPSBhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWhpZGRlbl1cIik7XHJcblxyXG4gICAgICAgICAgaWYgKGFjY29yZGlvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1hY2NvcmRpb24tYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgIGFjYy5oaWRlKCk7XHJcbiAgICAgICAgICAgIHBhcmVudENvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gYCR7cGFyZW50Q29udGVudC5jbGllbnRIZWlnaHQgLSBhY2MuY29udGVudEhlaWdodH1weGA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY2Muc2hvdygpO1xyXG4gICAgICAgICAgICBwYXJlbnRDb250ZW50LnN0eWxlLmhlaWdodCA9IGAke3BhcmVudENvbnRlbnQuY2xpZW50SGVpZ2h0ICsgYWNjLmNvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLW5vdC1jbG9zZV1cIikpIHtcclxuICAgICAgICAgIGFjYy50b2dnbGUoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRhaW5lcl1cIikpIHtcclxuICAgICAgICAgIGhpZGVBbGxBY2NvcmRpb25zKGFjYy5jdXJyZW50LmNsb3Nlc3QoXCJbZGF0YS1hY2NvcmRpb24tY29udGFpbmVyXVwiKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY2MuY3VycmVudC5jbG9zZXN0KFwiLnNlY3Rpb25cIikpIHtcclxuICAgICAgICAgIGhpZGVBbGxBY2NvcmRpb25zKGFjYy5jdXJyZW50LmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjYy50b2dnbGUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoYWNjb3JkaW9uLmNsYXNzTGlzdC5jb250YWlucyhcImpzLWFjY29yZGlvbi1hY3RpdmVcIikpIHtcclxuICAgICAgICBhY2Muc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG4iLCJ2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXItbWVudScpO1xuXG5mdW5jdGlvbiBidXJnZXJNZW51KGJ1dHRvbikge1xuICBpZiAoIWJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlcl9hY3RpdmUnKSkge1xuICAgIGZpeFNjcm9sbCh0cnVlKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnVyZ2VyX2FjdGl2ZScpO1xuICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnYnVyZ2VyLW1lbnVfYWN0aXZlJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbG93XScpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnbmF2X19pdGVtX3Nsb3cnKTtcbiAgICAgIH0pO1xuICAgIH0sIDEwMCk7XG4gIH0gZWxzZSB7XG4gICAgY2xvc2VCdXJnZXJNZW51KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VCdXJnZXJNZW51KCkge1xuICBmaXhTY3JvbGwoZmFsc2UpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbG93XScpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2l0ZW1fc2xvdycpO1xuICB9KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2J1cmdlcl9hY3RpdmUnKTtcbiAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2J1cmdlci1tZW51X2FjdGl2ZScpO1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBmaXhTY3JvbGwoYm9vbCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBpZiAoYm9vbCkge1xuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2dldFNjcm9sbEJhcldpZHRoKCl9cHhgO1xuICB9IGVsc2Uge1xuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAwcHhgO1xuICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxheWVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjbG9zZUJ1cmdlck1lbnUoKTtcbn0pO1xuXG5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKS5mb3JFYWNoKGxpbmsgPT4ge1xuICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNsb3NlQnVyZ2VyTWVudSgpO1xuICB9KTtcbn0pOyIsInZhciBzaG9ydEFuaW1hdGlvbkR1cmF0aW9uID0gMC4yO1xudmFyIGRlZmF1bHRBbmltYXRpb25EdXJhdGlvbiA9IDAuMzU7XG52YXIgbWVkaXVtQW5pbWF0aW9uRHVyYXRpb24gPSAwLjQ1O1xudmFyIGxvbmdBbmltYXRpb25EdXJhdGlvbiA9IDAuNztcblxuLypcbuKVreKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgNCX0LDQvNC10YLQntGH0LrQsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVrlxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKUgiAgICAgICAg0JfQsNC80LXQvdC40YLRjCDQt9Cw0L/RgNC+0YHRiyDQsiBtZWRpYS5zY3NzICAgICAgIOKUglxu4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbuKVsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVr1xuKi9cbnZhciBtZWRpYSA9IHtcbiAgbW9iaWxlOiA2MzAsXG4gIHRhYmxldDogMTI1MCxcbiAgbGFwdG9wOiAxNzAwLFxuICBkZXNrdG9wOiAyMjAwXG59XG5cbnZhciByb290U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXG52YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlci5oZWFkZXJcIik7XG5cbi8qXG7ila3ilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDQl9Cw0LzQtdGC0J7Rh9C60LDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila5cbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilIIgICAgICAgINCf0YDQvtCy0LXRgNC60LAg0L3QsCDRiNC40YDQuNC90YMg0YHQutGA0L7Qu9C70LHQsNGA0LAgICAgICAg4pSCXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pWw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWvXG4qL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsQmFyV2lkdGgoKSB7XG4gIGxldCBhLCBiO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KFwib3ZlcmZsb3dcIiwgXCJhdXRvXCIpO1xuICBhID0gc3RhcnRTaXplID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xuICBiID0gZW5kU2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgcmV0dXJuIGIgLSBhO1xufVxuXG4vKlxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pSCICAgICAgIHRydWUvZmFsc2Ug0L3QsCDQvdCw0LvQuNGH0LjQtSDRgdC60YDQvtC70LvQsCAgICAgICAg4pSCXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pWw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWvXG4qL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsKGEvKiovLCBlID0gZC5kb2N1bWVudEVsZW1lbnQsIGQvKvCfk4QqLyA9IGRvY3VtZW50LCBiLyrwn6S34oCN4pmC77iPKi8gPSBkLmJvZHksKSB7XG4gIHJldHVybiAvQ1NTLy50ZXN0KGQuY29tcGF0TW9kZSkgPyAoZVtcImNsaWVudFwiICsgYV0gPCBlW1wic2Nyb2xsXCIgKyBhXSkgOiAoYltcImNsaWVudFwiICsgYV0gPCBiW2FdKVxufVxuXG4vKlxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxu4pSCICAgICDQkdCw0LfQvtCy0LDRjyDQvtCx0YDQsNCx0L7RgtC60LAg0LLQtdC70LjRh9C40L0g0LIgbnVtYmVyICAgICDilIJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cbiovXG5mdW5jdGlvbiBjc3NUb051bWJlcih2YWx1ZSkge1xuICBpZiAodmFsdWUuZW5kc1dpdGgoXCJyZW1cIikpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgKiBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5mb250U2l6ZSk7XG4gIH0gZWxzZSBpZiAodmFsdWUuZW5kc1dpdGgoXCJ2d1wiKSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSAqIDI1NjAgLyAxMDA7XG4gIH0gZWxzZSBpZiAodmFsdWUuZW5kc1dpdGgoXCJweFwiKSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG59XG5cbi8qXG7ila3ilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDQl9Cw0LzQtdGC0J7Rh9C60LDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila5cbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilIIgICAgICDQntC/0YLQuNC80LjQt9Cw0YbQuNGPINC/0L7QstGC0L7RgNGP0Y7RidC40YXRgdGPINGE0YPQvdC60YbQuNC5ICAgICDilIJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKSwgd2FpdCk7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAvLyDQpNC40LrRgSDQt9GD0LzQsCDQuiDQuNC90L/Rg9GC0LDQvCDQvdCwINC80L7QsdC40LvRjNC90YvRhVxuICBjb25zdCBtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPXZpZXdwb3J0XVwiKTtcbiAgbWV0YVZpZXdwb3J0LnNldEF0dHJpYnV0ZShcImNvbnRlbnRcIiwgYCR7bWV0YVZpZXdwb3J0LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIil9LCBtYXhpbXVtLXNjYWxlPTEuMGApO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICB9KTtcbiAgXG59KTtcblxubmV3IFN3aXBlcihcIi5zdGFja19fc3dpcGVyXCIsIHtcbiAgbmF2aWdhdGlvbjoge1xuICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgfSxcbiAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXG4gIHNwYWNlQmV0d2VlbjogMjAsXG4gIGxvb3A6IGZhbHNlLFxuICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICBzbGlkZXNQZXJHcm91cEF1dG86IHRydWUsXG4gIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICBncmFiQ3Vyc29yOiB0cnVlLFxuICBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IGZhbHNlLFxuICBzcGVlZDogNTAwXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIEZhbmN5Ym94LmJpbmQoXCJbZGF0YS1mYW5jeWJveF1cIiwge1xyXG4gICAgVGh1bWJzOiBmYWxzZSxcclxuICAgIFRvb2xiYXI6IHtcclxuICAgICAgZGlzcGxheToge1xyXG4gICAgICAgIGxlZnQ6IFtdLFxyXG4gICAgICAgIG1pZGRsZTogW10sXHJcbiAgICAgICAgcmlnaHQ6IFtcImNsb3NlXCJdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIENhcm91c2VsOiB7XHJcbiAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgdHJhbnNpdGlvbjogXCJzbGlkZVwiLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgRmFuY3lib3guYmluZChcIltkYXRhLW1vZGFsXVwiLCB7XHJcbiAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgLy8g0K3RgtC+INC00LvRjyDQvtGC0LrQu9GO0YfQtdC90LjRjyDQt9Cw0LrRgNGL0YLQuNGPINC/0LXRgNC10YLQsNGB0LrQuNCy0LDQvdC40LXQvFxyXG4gICAgZHJhZ1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgQ2Fyb3VzZWw6IHtcclxuICAgICAgUGFuem9vbToge1xyXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbW9kYWxdXCIpLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGYW5jeWJveC5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iLCJpc01vYmlsZSA9IHtcclxuICBBbmRyb2lkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcclxuICB9LFxyXG4gIEJsYWNrQmVycnk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpO1xyXG4gIH0sXHJcbiAgaU9TOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKTtcclxuICB9LFxyXG4gIE9wZXJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKTtcclxuICB9LFxyXG4gIFdpbmRvd3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZS9pKTtcclxuICB9LFxyXG4gIGFueTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChpc01vYmlsZS5BbmRyb2lkKCkgfHwgaXNNb2JpbGUuQmxhY2tCZXJyeSgpIHx8IGlzTW9iaWxlLmlPUygpIHx8IGlzTW9iaWxlLk9wZXJhKCkgfHwgaXNNb2JpbGUuV2luZG93cygpKTtcclxuICB9XHJcbn1cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGxldCBjb250YWluZXJPZmZzZXQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKSwgbnVsbCk7XHJcbiAgY29udGFpbmVyT2Zmc2V0ID0gY29udGFpbmVyT2Zmc2V0LmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKS50cmltKCk7XHJcbiAgY29udGFpbmVyT2Zmc2V0ID0gTnVtYmVyKGNvbnRhaW5lck9mZnNldC5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xyXG5cclxuICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFNtb290aGVyLCBTY3JvbGxUb1BsdWdpbiwgQ3VzdG9tRWFzZSk7XHJcblxyXG4gIEN1c3RvbUVhc2UuY3JlYXRlKFwiY3ViaWNEZWZhdWx0XCIsIFwiLjM2LC4zLDAsMVwiKTtcclxuXHJcbiAgZnVuY3Rpb24gY3VycmVudEdTQVAoKSB7XHJcbiAgICAvLyBpZiAoIWlzTW9iaWxlLmFueSgpKSB7XHJcbiAgICAvLyAgIGNvbnN0IHNtb290aGVyID0gU2Nyb2xsU21vb3RoZXIuY3JlYXRlKHtcclxuICAgIC8vICAgICB3cmFwcGVyOiBcIi53cmFwcGVyXCIsXHJcbiAgICAvLyAgICAgY29udGVudDogXCIud3JhcHBlcl9fY29udGVudFwiLFxyXG4gICAgLy8gICAgIHNtb290aDogMS4zXHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vINCf0YDQuNC80LXRgCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRhNGD0L3QutGG0LjQuCBMaW5lQnlMaW5lQW5pbWF0aW9uXHJcbiAgICAvLyBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLnNlY3Rpb25cIiwgXCIuc2VjdGlvbl9faGVhZFwiKTtcclxuICB9XHJcblxyXG4gIC8vINCf0LvQsNCy0L3QvtC1INC/0L7Rj9Cy0LvQtdC90LjQtSDRgdCw0LnRgtCwXHJcbiAgLy8gYWxsQm9keUZpcnN0QW5pbWF0aW9uKFwiLnBhZ2VfX2JvZHlcIik7XHJcblxyXG4gIGN1cnJlbnRHU0FQKCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgY3NzSGFzUHNldWRvKGRvY3VtZW50LCB7IGZvcmNlUG9seWZpbGw6IGZhbHNlLCBob3ZlcjogdHJ1ZSB9KTtcclxuICBjc3NCbGFua1BzZXVkb0luaXQoeyBmb3JjZTogdHJ1ZSB9KTtcclxufSk7XHJcbiIsImZ1bmN0aW9uIGFsbEJvZHlGaXJzdEFuaW1hdGlvbihzZWxlY3RvciA9IFwiLnBhZ2VfX2JvZHlcIikge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChzZWN0aW9uID0+IHtcclxuICAgICAgZ3NhcC50byhcclxuICAgICAgICBzZWN0aW9uLFxyXG4gICAgICAgIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IG1lZGl1bUFuaW1hdGlvbkR1cmF0aW9uLCBlYXNlOiBcImN1YmljRGVmYXVsdFwiIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJmdW5jdGlvbiBMaW5lQnlMaW5lQW5pbWF0aW9uKHNlbGVjdG9yID0gXCJbZGF0YS1jb250YWluZXItYW5pbWF0aW9uXVwiLCBibG9jayA9IFwiW2RhdGEtYmxvY2stYW5pbWF0aW9uXVwiLCBzdGFydCA9IFwiMTAwJVwiKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcblxyXG4gICAgICBpZiAoc2VjdGlvbi5xdWVyeVNlbGVjdG9yKGJsb2NrKSkge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsVEwgPSBnc2FwLnRpbWVsaW5lKCk7XHJcblxyXG4gICAgICAgIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChibG9jaykuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2spIHtcclxuXHJcbiAgICAgICAgICAvLyDQmNCz0L3QvtGA0LjRgNGD0LXQvCDQsdC70L7QutC4INCy0L3Rg9GC0YDQuCAuc2VjdGlvbi1uYW1lXHJcbiAgICAgICAgICAvLyBpZiAoISFibG9jay5jbG9zZXN0KFwiLnNlY3Rpb24tbmFtZVwiKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgICAgICBibG9jayxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgeTogNzBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogbG9uZ0FuaW1hdGlvbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgIGVhc2U6IFwiY3ViaWNEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogYmxvY2ssXHJcbiAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgXCIgKyBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogXCJib3R0b20gMCVcIixcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgbm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc2NydWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIC8vINCh0LrRgNC+0LvQuyDQtNC+INGN0LvQtdC80LXQvdGC0LBcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNjcm9sbC10b11cIikpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zY3JvbGwtdG9dXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgIHNjcm9sbFRvOiB7XHJcbiAgICAgICAgICAgIHk6IGAjJHtpdGVtLmdldEF0dHJpYnV0ZShcImhyZWZcIikuc3BsaXQoXCIjXCIpWzFdfWAsXHJcbiAgICAgICAgICAgIG9mZnNldFk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIuaGVhZGVyXCIpLmNsaWVudEhlaWdodCArIGNzc1RvTnVtYmVyKHJvb3RTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcIi0tY29udGFpbmVyLW9mZnNldC1vdXRlclwiKS50cmltKCkpLFxyXG4gICAgICAgICAgICBhdXRvS2lsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBgLT0xYCk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcbiJdfQ==
