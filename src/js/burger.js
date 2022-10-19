const burger = document.querySelector('[data-burger]');
const box = document.querySelector('[data-box]');
const nav = document.querySelector('[data-nav]');
const themeSwitch = document.querySelector('[data-switch]');
const logo = document.querySelector('.logo');
const searchForm = document.querySelector('.search-form');
const navItems = nav.querySelectorAll('a');
const form = document.querySelector('.search-form');
const body = document.body;

burger.addEventListener('click', onBurger);

function onBurger() {
  body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger-active');
  box.classList.toggle('visible');
  nav.classList.toggle('visible');
  themeSwitch.classList.toggle('visible');
  logo.classList.toggle('visible');
  searchForm.classList.toggle('visible');

  document.addEventListener('keydown', closeBurgerKeyboard);

  form.addEventListener('submit', () => {
    return closeBurger();
  });
}

function closeBurgerKeyboard(e) {
  if (e.code === 'Escape') {
    return closeBurger();
  }
}

function closeBurger() {
  body.classList.remove('stop-scroll');
  burger.classList.remove('burger-active');
  box.classList.remove('visible');
  nav.classList.remove('visible');
  themeSwitch.classList.remove('visible');
  logo.classList.add('visible');
  searchForm.classList.add('visible');
  document.removeEventListener('keydown', closeBurgerKeyboard);
}
