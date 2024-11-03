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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImNvbW1vbi5qcyIsImZhbmN5Ym94LmpzIiwiaXNNb2JpbGUuanMiLCJhbmltYXRpb24vaW5kZXguanMiLCJwb3N0Y3NzL3BvbHlmaWxscy5qcyIsImFuaW1hdGlvbi9jb21tb24vYm9keS5qcyIsImFuaW1hdGlvbi9jb21tb24vbGluZS1ieS1saW5lLmpzIiwiYW5pbWF0aW9uL2NvbW1vbi9zY3JvbGwtdG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBFbGl0ZUFjY29yZGlvbiB7XHJcbiAgY29uc3RydWN0b3IoYWNjb3JkaW9uKSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uID0gMzUwOyAvLyDQktGA0LXQvNGPINCw0L3QuNC80LDRhtC40Lgg0LIg0LzQuNC70LvQuNGB0LXQutGD0L3QtNCw0YUg0LjQtyDQv9C10YDQtdC80LXQvdC90L7QuSAtLWFuaW1hdGlvbi1kdXJhdGlvblxyXG4gICAgdGhpcy5hY2NvcmRpb24gPSBhY2NvcmRpb247XHJcbiAgICB0aGlzLmhpZGRlbiA9IHRoaXMuYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24taGlkZGVuXVwiKTtcclxuICAgIHRoaXMuY29udGVudCA9IHRoaXMuYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb24tY29udGVudF1cIik7XHJcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmFjY29yZGlvbi5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uLWN1cnJlbnRdXCIpO1xyXG4gICAgdGhpcy5jb250ZW50SGVpZ2h0ID0gdGhpcy5jb250ZW50LmNsaWVudEhlaWdodDtcclxuICAgIHRoaXMuYWNjb3JkaW9uSWNvbiA9IG51bGw7XHJcbiAgICB0aGlzLmljb25IaWRkZW4gPSBudWxsO1xyXG4gICAgdGhpcy5JY29uU2hvdyA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uLWljb25dXCIpKSB7XHJcbiAgICAgIHRoaXMuYWNjb3JkaW9uSWNvbiA9IHRoaXMuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtYWNjb3JkaW9uLWljb25dXCIpO1xyXG5cclxuICAgICAgbGV0IGljb25MaXN0ID0gdGhpcy5hY2NvcmRpb25JY29uLmdldEF0dHJpYnV0ZShcImRhdGEtYWNjb3JkaW9uLWljb25cIik7XHJcbiAgICAgIGljb25MaXN0ID0gaWNvbkxpc3Quc3Vic3RyaW5nKDEsIGljb25MaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICBsZXQgaWNvbkFycmF5ID0gaWNvbkxpc3Quc3BsaXQoXCIsXCIpO1xyXG4gICAgICBpZiAoaWNvbkFycmF5Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgdGhpcy5pY29uSGlkZGVuID0gaWNvbkFycmF5WzBdLnRyaW0oKSxcclxuICAgICAgICAgIHRoaXMuSWNvblNob3cgPSBpY29uQXJyYXlbMV0udHJpbSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIGRhdGEtYWNjb3JkaW9uLWljb24gYXR0cmlidXRlXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFjY29yZGlvbkljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVwbGFjZUljb24oaGlkZGVuID0gdHJ1ZSkge1xyXG4gICAgaWYgKCF0aGlzLmFjY29yZGlvbkljb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5hY2NvcmRpb25JY29uLnF1ZXJ5U2VsZWN0b3IoXCJ1c2VcIikpIHtcclxuICAgICAgY29uc29sZS5kZWJ1ZyhcIk5vIHVzZSB0YWcgZm91bmQgaW4gdGhlIGFjY29yZGlvbiBpY29uXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhpZGRlbikge1xyXG4gICAgICB0aGlzLmFjY29yZGlvbkljb24ucXVlcnlTZWxlY3RvcihcInVzZVwiKVxyXG4gICAgICAgIC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgXCIvYXNzZXRzL3RlbXBsYXRlcy9pbWcvc3ByaXRlLnN2ZyNcIiArIHRoaXMuaWNvbkhpZGRlbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjY29yZGlvbkljb24ucXVlcnlTZWxlY3RvcihcInVzZVwiKVxyXG4gICAgICAgIC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgXCIvYXNzZXRzL3RlbXBsYXRlcy9pbWcvc3ByaXRlLnN2ZyNcIiArIHRoaXMuSWNvblNob3cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsSW50b1ZpZXcoKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcclxuICAgICAgYmxvY2s6IFwic3RhcnRcIixcclxuICAgICAgaW5saW5lOiBcIm5lYXJlc3RcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5oaWRkZW4uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5jb250ZW50SGVpZ2h0fXB4YDtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmNsYXNzTGlzdC5hZGQoXCJqcy1hY2NvcmRpb24tYWN0aXZlXCIpO1xyXG5cclxuICAgIC8vINCh0LrRgNC+0LvQuyDQuiDQvtGC0LrRgNGL0YLQvtC80YMg0LDQutC60L7RgNC00LXQvtC90YNcclxuICAgIC8vIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5yZXBsYWNlSWNvbihmYWxzZSk7XHJcbiAgICB9LCB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uIC8gMik7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5oaWRkZW4uc3R5bGUuaGVpZ2h0ID0gXCJcIjtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJqcy1hY2NvcmRpb24tYWN0aXZlXCIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlcGxhY2VJY29uKHRydWUpO1xyXG4gICAgfSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbiAvIDIpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5hY2NvcmRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtYWNjb3JkaW9uLWFjdGl2ZVwiKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgfSwgdGhpcy5hbmltYXRpb25EdXJhdGlvbik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlQWxsQWNjb3JkaW9ucyhjbG9zZXN0T2JqZWN0KSB7XHJcbiAgY2xvc2VzdE9iamVjdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtYWNjb3JkaW9uXS5qcy1hY2NvcmRpb24tYWN0aXZlXCIpLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZUFjY29yZGlvbikge1xyXG4gICAgaWYgKGFjdGl2ZUFjY29yZGlvbiAhPSBldmVudC50YXJnZXQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbl1cIikpIHtcclxuICAgICAgY29uc3QgYWNjID0gbmV3IEVsaXRlQWNjb3JkaW9uKGFjdGl2ZUFjY29yZGlvbik7XHJcbiAgICAgIGFjYy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1hY2NvcmRpb25dXCIpKSB7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWFjY29yZGlvbl1cIikuZm9yRWFjaChmdW5jdGlvbiAoYWNjb3JkaW9uKSB7XHJcbiAgICAgIGNvbnN0IGFjYyA9IG5ldyBFbGl0ZUFjY29yZGlvbihhY2NvcmRpb24pO1xyXG5cclxuICAgICAgYWNjLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRlbnRdXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCBwYXJlbnRDb250ZW50ID0gYWNjLmN1cnJlbnQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbi1oaWRkZW5dXCIpO1xyXG5cclxuICAgICAgICAgIGlmIChhY2NvcmRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtYWNjb3JkaW9uLWFjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICBhY2MuaGlkZSgpO1xyXG4gICAgICAgICAgICBwYXJlbnRDb250ZW50LnN0eWxlLmhlaWdodCA9IGAke3BhcmVudENvbnRlbnQuY2xpZW50SGVpZ2h0IC0gYWNjLmNvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWNjLnNob3coKTtcclxuICAgICAgICAgICAgcGFyZW50Q29udGVudC5zdHlsZS5oZWlnaHQgPSBgJHtwYXJlbnRDb250ZW50LmNsaWVudEhlaWdodCArIGFjYy5jb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWNjLmN1cnJlbnQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbi1ub3QtY2xvc2VdXCIpKSB7XHJcbiAgICAgICAgICBhY2MudG9nZ2xlKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWNjLmN1cnJlbnQuY2xvc2VzdChcIltkYXRhLWFjY29yZGlvbi1jb250YWluZXJdXCIpKSB7XHJcbiAgICAgICAgICBoaWRlQWxsQWNjb3JkaW9ucyhhY2MuY3VycmVudC5jbG9zZXN0KFwiW2RhdGEtYWNjb3JkaW9uLWNvbnRhaW5lcl1cIikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWNjLmN1cnJlbnQuY2xvc2VzdChcIi5zZWN0aW9uXCIpKSB7XHJcbiAgICAgICAgICBoaWRlQWxsQWNjb3JkaW9ucyhhY2MuY3VycmVudC5jbG9zZXN0KFwiLnNlY3Rpb25cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhY2MudG9nZ2xlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGFjY29yZGlvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1hY2NvcmRpb24tYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgYWNjLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuIiwidmFyIHNob3J0QW5pbWF0aW9uRHVyYXRpb24gPSAwLjI7XHJcbnZhciBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb24gPSAwLjM1O1xyXG52YXIgbWVkaXVtQW5pbWF0aW9uRHVyYXRpb24gPSAwLjQ1O1xyXG52YXIgbG9uZ0FuaW1hdGlvbkR1cmF0aW9uID0gMC43O1xyXG5cclxuLypcclxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXHJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXHJcbuKUgiAgICAgICAg0JfQsNC80LXQvdC40YLRjCDQt9Cw0L/RgNC+0YHRiyDQsiBtZWRpYS5zY3NzICAgICAgIOKUglxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cclxuKi9cclxudmFyIG1lZGlhID0ge1xyXG4gIG1vYmlsZTogNjMwLFxyXG4gIHRhYmxldDogMTI1MCxcclxuICBsYXB0b3A6IDE3MDAsXHJcbiAgZGVza3RvcDogMjIwMFxyXG59XHJcblxyXG52YXIgcm9vdFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcclxuXHJcbnZhciBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyLmhlYWRlclwiKTtcclxuXHJcbi8qXHJcbuKVreKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgNCX0LDQvNC10YLQntGH0LrQsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVrlxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilIIgICAgICAgINCf0YDQvtCy0LXRgNC60LAg0L3QsCDRiNC40YDQuNC90YMg0YHQutGA0L7Qu9C70LHQsNGA0LAgICAgICAg4pSCXHJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXHJcbuKVsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVr1xyXG4qL1xyXG5mdW5jdGlvbiBnZXRTY3JvbGxCYXJXaWR0aCgpIHtcclxuICBsZXQgYSwgYjtcclxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KFwib3ZlcmZsb3dcIiwgXCJhdXRvXCIpO1xyXG4gIGEgPSBzdGFydFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcclxuICBiID0gZW5kU2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xyXG4gIHJldHVybiBiIC0gYTtcclxufVxyXG5cclxuLypcclxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXHJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXHJcbuKUgiAgICAgICB0cnVlL2ZhbHNlINC90LAg0L3QsNC70LjRh9C40LUg0YHQutGA0L7Qu9C70LAgICAgICAgIOKUglxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cclxuKi9cclxuZnVuY3Rpb24gZ2V0U2Nyb2xsKGEvKiovLCBlID0gZC5kb2N1bWVudEVsZW1lbnQsIGQvKvCfk4QqLyA9IGRvY3VtZW50LCBiLyrwn6S34oCN4pmC77iPKi8gPSBkLmJvZHksKSB7XHJcbiAgcmV0dXJuIC9DU1MvLnRlc3QoZC5jb21wYXRNb2RlKSA/IChlW1wiY2xpZW50XCIgKyBhXSA8IGVbXCJzY3JvbGxcIiArIGFdKSA6IChiW1wiY2xpZW50XCIgKyBhXSA8IGJbYV0pXHJcbn1cclxuXHJcbi8qXHJcbuKVreKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgNCX0LDQvNC10YLQntGH0LrQsOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKVrlxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilIIgICAgINCR0LDQt9C+0LLQsNGPINC+0LHRgNCw0LHQvtGC0LrQsCDQstC10LvQuNGH0LjQvSDQsiBudW1iZXIgICAgIOKUglxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cclxuKi9cclxuZnVuY3Rpb24gY3NzVG9OdW1iZXIodmFsdWUpIHtcclxuICBpZiAodmFsdWUuZW5kc1dpdGgoXCJyZW1cIikpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSAqIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplKTtcclxuICB9IGVsc2UgaWYgKHZhbHVlLmVuZHNXaXRoKFwidndcIikpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSAqIDI1NjAgLyAxMDA7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZS5lbmRzV2l0aChcInB4XCIpKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxufVxyXG5cclxuLypcclxu4pWt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA0JfQsNC80LXRgtCe0YfQutCw4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pWuXHJcbuKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXHJcbuKUgiAgICAgINCe0L/RgtC40LzQuNC30LDRhtC40Y8g0L/QvtCy0YLQvtGA0Y/RjtGJ0LjRhdGB0Y8g0YTRg9C90LrRhtC40LkgICAgIOKUglxyXG7ilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxyXG7ilbDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDila9cclxuKi9cclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xyXG4gIGxldCB0aW1lb3V0O1xyXG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKSwgd2FpdCk7XHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0KTQuNC60YEg0LfRg9C80LAg0Log0LjQvdC/0YPRgtCw0Lwg0L3QsCDQvNC+0LHQuNC70YzQvdGL0YVcclxuICBjb25zdCBtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPXZpZXdwb3J0XVwiKTtcclxuICBtZXRhVmlld3BvcnQuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBgJHttZXRhVmlld3BvcnQuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKX0sIG1heGltdW0tc2NhbGU9MS4wYCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIEZhbmN5Ym94LmJpbmQoXCJbZGF0YS1mYW5jeWJveF1cIiwge1xyXG4gICAgVGh1bWJzOiBmYWxzZSxcclxuICAgIFRvb2xiYXI6IHtcclxuICAgICAgZGlzcGxheToge1xyXG4gICAgICAgIGxlZnQ6IFtdLFxyXG4gICAgICAgIG1pZGRsZTogW10sXHJcbiAgICAgICAgcmlnaHQ6IFtcImNsb3NlXCJdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIENhcm91c2VsOiB7XHJcbiAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgdHJhbnNpdGlvbjogXCJzbGlkZVwiLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgRmFuY3lib3guYmluZChcIltkYXRhLW1vZGFsXVwiLCB7XHJcbiAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgLy8g0K3RgtC+INC00LvRjyDQvtGC0LrQu9GO0YfQtdC90LjRjyDQt9Cw0LrRgNGL0YLQuNGPINC/0LXRgNC10YLQsNGB0LrQuNCy0LDQvdC40LXQvFxyXG4gICAgZHJhZ1RvQ2xvc2U6IGZhbHNlLFxyXG4gICAgQ2Fyb3VzZWw6IHtcclxuICAgICAgUGFuem9vbToge1xyXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbW9kYWxdXCIpLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGYW5jeWJveC5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iLCJpc01vYmlsZSA9IHtcclxuICBBbmRyb2lkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcclxuICB9LFxyXG4gIEJsYWNrQmVycnk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpO1xyXG4gIH0sXHJcbiAgaU9TOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKTtcclxuICB9LFxyXG4gIE9wZXJhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKTtcclxuICB9LFxyXG4gIFdpbmRvd3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZS9pKTtcclxuICB9LFxyXG4gIGFueTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChpc01vYmlsZS5BbmRyb2lkKCkgfHwgaXNNb2JpbGUuQmxhY2tCZXJyeSgpIHx8IGlzTW9iaWxlLmlPUygpIHx8IGlzTW9iaWxlLk9wZXJhKCkgfHwgaXNNb2JpbGUuV2luZG93cygpKTtcclxuICB9XHJcbn1cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGxldCBjb250YWluZXJPZmZzZXQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKSwgbnVsbCk7XHJcbiAgY29udGFpbmVyT2Zmc2V0ID0gY29udGFpbmVyT2Zmc2V0LmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKS50cmltKCk7XHJcbiAgY29udGFpbmVyT2Zmc2V0ID0gTnVtYmVyKGNvbnRhaW5lck9mZnNldC5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xyXG5cclxuICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFNtb290aGVyLCBTY3JvbGxUb1BsdWdpbiwgQ3VzdG9tRWFzZSk7XHJcblxyXG4gIEN1c3RvbUVhc2UuY3JlYXRlKFwiY3ViaWNEZWZhdWx0XCIsIFwiLjM2LC4zLDAsMVwiKTtcclxuXHJcbiAgZnVuY3Rpb24gY3VycmVudEdTQVAoKSB7XHJcbiAgICAvLyBpZiAoIWlzTW9iaWxlLmFueSgpKSB7XHJcbiAgICAvLyAgIGNvbnN0IHNtb290aGVyID0gU2Nyb2xsU21vb3RoZXIuY3JlYXRlKHtcclxuICAgIC8vICAgICB3cmFwcGVyOiBcIi53cmFwcGVyXCIsXHJcbiAgICAvLyAgICAgY29udGVudDogXCIud3JhcHBlcl9fY29udGVudFwiLFxyXG4gICAgLy8gICAgIHNtb290aDogMS4zXHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vINCf0YDQuNC80LXRgCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRhNGD0L3QutGG0LjQuCBMaW5lQnlMaW5lQW5pbWF0aW9uXHJcbiAgICAvLyBMaW5lQnlMaW5lQW5pbWF0aW9uKFwiLnNlY3Rpb25cIiwgXCIuc2VjdGlvbl9faGVhZFwiKTtcclxuICB9XHJcblxyXG4gIC8vINCf0LvQsNCy0L3QvtC1INC/0L7Rj9Cy0LvQtdC90LjQtSDRgdCw0LnRgtCwXHJcbiAgLy8gYWxsQm9keUZpcnN0QW5pbWF0aW9uKFwiLnBhZ2VfX2JvZHlcIik7XHJcblxyXG4gIGN1cnJlbnRHU0FQKCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgY3NzSGFzUHNldWRvKGRvY3VtZW50LCB7IGZvcmNlUG9seWZpbGw6IGZhbHNlLCBob3ZlcjogdHJ1ZSB9KTtcclxuICBjc3NCbGFua1BzZXVkb0luaXQoeyBmb3JjZTogdHJ1ZSB9KTtcclxufSk7XHJcbiIsImZ1bmN0aW9uIGFsbEJvZHlGaXJzdEFuaW1hdGlvbihzZWxlY3RvciA9IFwiLnBhZ2VfX2JvZHlcIikge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChzZWN0aW9uID0+IHtcclxuICAgICAgZ3NhcC50byhcclxuICAgICAgICBzZWN0aW9uLFxyXG4gICAgICAgIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IG1lZGl1bUFuaW1hdGlvbkR1cmF0aW9uLCBlYXNlOiBcImN1YmljRGVmYXVsdFwiIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJmdW5jdGlvbiBMaW5lQnlMaW5lQW5pbWF0aW9uKHNlbGVjdG9yID0gXCJbZGF0YS1jb250YWluZXItYW5pbWF0aW9uXVwiLCBibG9jayA9IFwiW2RhdGEtYmxvY2stYW5pbWF0aW9uXVwiLCBzdGFydCA9IFwiMTAwJVwiKSB7XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcblxyXG4gICAgICBpZiAoc2VjdGlvbi5xdWVyeVNlbGVjdG9yKGJsb2NrKSkge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsVEwgPSBnc2FwLnRpbWVsaW5lKCk7XHJcblxyXG4gICAgICAgIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChibG9jaykuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2spIHtcclxuXHJcbiAgICAgICAgICAvLyDQmNCz0L3QvtGA0LjRgNGD0LXQvCDQsdC70L7QutC4INCy0L3Rg9GC0YDQuCAuc2VjdGlvbi1uYW1lXHJcbiAgICAgICAgICAvLyBpZiAoISFibG9jay5jbG9zZXN0KFwiLnNlY3Rpb24tbmFtZVwiKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgICAgICBibG9jayxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgeTogNzBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogbG9uZ0FuaW1hdGlvbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgIGVhc2U6IFwiY3ViaWNEZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogYmxvY2ssXHJcbiAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgXCIgKyBzdGFydCxcclxuICAgICAgICAgICAgICAgIGVuZDogXCJib3R0b20gMCVcIixcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgbm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc2NydWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIC8vINCh0LrRgNC+0LvQuyDQtNC+INGN0LvQtdC80LXQvdGC0LBcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXNjcm9sbC10b11cIikpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zY3JvbGwtdG9dXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgIHNjcm9sbFRvOiB7XHJcbiAgICAgICAgICAgIHk6IGAjJHtpdGVtLmdldEF0dHJpYnV0ZShcImhyZWZcIikuc3BsaXQoXCIjXCIpWzFdfWAsXHJcbiAgICAgICAgICAgIG9mZnNldFk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIuaGVhZGVyXCIpLmNsaWVudEhlaWdodCArIGNzc1RvTnVtYmVyKHJvb3RTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcIi0tY29udGFpbmVyLW9mZnNldC1vdXRlclwiKS50cmltKCkpLFxyXG4gICAgICAgICAgICBhdXRvS2lsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBgLT0xYCk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcbiJdfQ==
