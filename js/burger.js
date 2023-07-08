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
  const siteContainer = document.querySelector('.site-container');
  const body = document.querySelector('body');
  if (bool) {
    siteContainer.classList.add('disable-scroll');
    body.style.paddingRight = `${getScrollBarWidth()}px`;
  } else {
    siteContainer.classList.remove('disable-scroll');
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

function getScrollBarWidth() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";
  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);
  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;
  document.body.removeChild (outer);
  return (w1 - w2);
};
