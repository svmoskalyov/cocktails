const pageHeader = document.querySelector('.page-header');
const body = document.body;

bodyAutoTop();

function bodyAutoTop() {
  const { height: pageHeaderHeight } = pageHeader.getBoundingClientRect();
  body.style.paddingTop = `${pageHeaderHeight}px`;
}
