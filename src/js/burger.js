const burger = document.querySelector('[data-burger]');
const box = document.querySelector('[data-box]');
const nav = document.querySelector('[data-nav]');
const themeSwitch = document.querySelector('[data-switch]');
const logo = document.querySelector('.logo');
const searchForm = document.querySelector('.search-form');
const body = document.body;
const navItems = nav.querySelectorAll('a');

burger.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger.classList.toggle('burger-active');
  box.classList.toggle('visible');
  nav.classList.toggle('visible');
  themeSwitch.classList.toggle('visible');
  logo.classList.toggle('visible');
  searchForm.classList.toggle('visible');
});

navItems.forEach(el => {
// console.log(el.innerText);
  el.addEventListener('click', () => {
    // console.log(el.innerText);
    if (el.innerText === 'Favorite') {
      // console.log('find favorite');
      return;
    }

    body.classList.remove('stop-scroll');
    burger.classList.remove('burger-active');
    box.classList.remove('visible');
    nav.classList.remove('visible');
    themeSwitch.classList.remove('visible');
    logo.classList.add('visible');
    searchForm.classList.add('visible');
  });
});
