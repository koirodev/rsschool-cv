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