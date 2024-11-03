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