import { writeRemovetIngridientFunction } from './ingridients';
import { checkedBtns } from './service/firebase';
import { getInfoAboutIngridientByName } from './service/apiData';
import { sampleModalComponents } from './markup/sampleModalComponents';

export function openIngridientInfoModal(selector) {
  const favoriteBtn = document.querySelector(selector);
  favoriteBtn?.addEventListener('click', openModal);
}

function openModal(e) {
  const ingridientItem = e.target.closest(
    '[data-open="open-ingridient-description"]'
  )?.dataset;

  if (ingridientItem?.open === 'open-ingridient-description') {
    getIngridient(ingridientItem?.ingridientname);
  }
}

async function getIngridient(IngrdName) {
  try {
    buildModal(IngrdName);
  } catch (error) {}
}

export function closeBybackdrop(e) {
  if (e.currentTarget === e.target) {
    e.target.remove();
    if (document.querySelector('.fav-ing')) {
      document.body.classList.remove('disable-scroll');
    }
  }
}

function closeMoreModal(e) {
  e.currentTarget.closest('.description__backdrop').remove();
  if (document.querySelector('.fav-ing')) {
    document.body.classList.remove('disable-scroll');
  }
}

function clickable() {
  const backdrop = document.querySelector('.description__backdrop');
  const closeBtn = backdrop.querySelector('[data-modal="close-ingred"]');
  const favoriteBtn = backdrop.querySelector('[data-ingr]');
  favoriteBtn.focus();
  if (document.querySelector('.fav-ing')) {
    document.body.classList.add('disable-scroll');
  }
  closeBtn.addEventListener('click', closeMoreModal);
  backdrop.addEventListener('click', closeBybackdrop);
}
async function getData(IngrdName) {
  const request = await getInfoAboutIngridientByName(IngrdName);
  const objectData = await request.data.ingredients[0];
  return await sampleModalComponents(objectData);
}

async function buildModal(IngrdName) {
  const createMarkup = await getData(IngrdName);
  const DOM =
    document.querySelector('.backdrop__cocktail') ??
    document.querySelector('.fav-ing');
  DOM.insertAdjacentHTML('beforeend', createMarkup);
  checkedBtns(
    '[data-ingr]',
    '/ingredients',
    'ingridientname',
    'data-ingr',
    {
      atrOnDel: 'remove-to-fav',
      atrOnAdd: 'add-to-fav',
    },
    { contOnDel: 'Remove from favorite', ContOnAdd: 'Add to favorite' }
  );
  writeRemovetIngridientFunction('[data-ingr]');
  clickable();
}
