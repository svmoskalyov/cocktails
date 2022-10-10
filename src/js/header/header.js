const burger = document.querySelector('[data-burger]');
const box = document.querySelector('[data-box]');
const nav = document.querySelector('[data-nav]');
const themeSwitch = document.querySelector('[data-switch]');
const logo = document.querySelector('.logo');
const searchForm = document.querySelector('.search-form');
const body = document.body;
const navItems = nav.querySelectorAll('a');

burger?.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger-active');
  box.classList.toggle('visible');
  nav.classList.toggle('visible');
  themeSwitch.classList.toggle('visible');
  logo.classList.toggle('visible');
  searchForm.classList.toggle('visible');
});

navItems.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('stop-scroll');
    burger.classList.remove('burger-active');
    box.classList.remove('visible');
    nav.classList.remove('visible');
    themeSwitch.classList.remove('visible');
    logo.classList.add('visible');
    searchForm.classList.add('visible');
  });
});

/* THEME SWITCH */
import { save, load } from './storage';

const THEME_STORAGE_KEY = 'theme';
const inputRef = document.querySelector('.theme-switch__toggle');
const ligth = document.querySelector('.theme-switch-light');
const dark = document.querySelector('.theme-switch-dark');
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

initPage();
inputRef.addEventListener('change', onThemeSwitch);

function initPage() {
  const savedChecked = load(THEME_STORAGE_KEY);

  inputRef.checked = savedChecked;
  document.body.className = savedChecked ? Theme.DARK : Theme.LIGHT;

  inputRef.checked
    ? (dark.classList.add('theme-switch-active'),
      ligth.classList.remove('theme-switch-active'))
    : dark.classList.remove(
        'theme-switch-active',
        ligth.classList.add('theme-switch-active')
      );
}

function onThemeSwitch(event) {
  const { checked } = event.target;

  document.body.className = checked ? Theme.DARK : Theme.LIGHT;
  save(THEME_STORAGE_KEY, checked);

  checked
    ? (dark.classList.add('theme-switch-active'),
      ligth.classList.remove('theme-switch-active'))
    : dark.classList.remove(
        'theme-switch-active',
        ligth.classList.add('theme-switch-active')
      );
}