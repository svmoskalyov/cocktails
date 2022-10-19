import { writeRemovetCoctaileFunction } from './coctails';
import { openIngridientInfoModal } from './modalComponents';
import { checkedBtns } from './service/firebase';
import { getInfoAboutCoctail } from './service/apiData';
import { sampleModalCoctails } from './markup/sampleModalCoctails';

export function openCoctaileInfoModal(selector) {
  const favoriteBtn = document.querySelector(selector);
  favoriteBtn?.addEventListener('click', showModal);
}
const modalAnc = document.querySelector('.modal__description');

async function showModal(e) {
  const typeOfBtn = e.target.dataset.open;
  if (typeOfBtn === 'open-modal-description') {
    try {
      bildPage(e, modalAnc);
    } catch (error) {
      console.log('error', error);
    }
  }
}

export function closeBybackdrop(e) {
  if (e.currentTarget === e.target) {
    e.target.remove();
    document.body.classList.remove('disable-scroll');
  }
}

function closeMoreModalByKeyboard(e) {
  if (e.code === 'Escape') {
    document.querySelector('.backdrop__cocktail')?.remove();
    document.body.classList.remove('disable-scroll');
  }
}

export function closeMoreModal(e) {
  e.currentTarget.closest('.backdrop__cocktail').remove();
  document.body.classList.remove('disable-scroll');
}

async function getData(e) {
  const coctaileId = e.target.dataset.moreid;
  const response = await getInfoAboutCoctail(coctaileId);
  const dataObj = await response.data.drinks[0];
  return sampleModalCoctails(dataObj);
}

async function bildPage(e, where) {
  const markupString = await getData(e);
  where.insertAdjacentHTML('beforeend', markupString);
  checkedBtns(
    '.modal__btnJS',
    '/coctailes',
    'cocktaileid',
    'data-add',
    {
      atrOnDel: 'remove-to-fav',
      atrOnAdd: 'add-to-fav',
    },
    { contOnDel: 'Remove from favorite', ContOnAdd: 'Add to favorite' }
  );
  clicable();
}

function clicable() {
  document.body.classList.add('disable-scroll');
  openIngridientInfoModal('.ingredients');
  writeRemovetCoctaileFunction('.modal__cocktail');

  const closeBtn = modalAnc.querySelector('.btn--close');
  const addFavBtn = modalAnc.querySelector('.modal__btnJS');
  const backdrop = modalAnc.querySelector('.backdrop__cocktail');

  addFavBtn.focus();
  backdrop.addEventListener('click', closeBybackdrop);
  document.addEventListener('keydown', closeMoreModalByKeyboard);
  closeBtn.addEventListener('click', closeMoreModal);
}
