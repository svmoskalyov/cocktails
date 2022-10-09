const burger = document?.querySelector('[data-burger]');
const box = document?.querySelector('[data-box]');
const nav = document?.querySelector('[data-nav]');
const body = document.body;
const navItems = nav?.querySelectorAll('a');

burger?.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger?.classList.toggle('burger-active');
  box?.classList.toggle('nav-visible');
  nav?.classList.toggle('nav-visible');
});

navItems.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('stop-scroll');
    burger?.classList.remove('burger-active');
    box?.classList.remove('nav-visible');
    nav?.classList.remove('nav-visible');
  });
});
