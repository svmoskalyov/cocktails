import { writeUserData, removeUserData, auth } from './service/firebase';
import { onAuthStateChanged } from 'firebase/auth';

async function addToFav(e) {
  const btn = e.target;

  if (btn?.dataset.add === 'add-to-fav') {
    const cockteileId = btn.dataset.cocktaileid;
    onAuthStateChanged(auth, user => {
      writeUserData(user?.uid, cockteileId, 'coctailes', {
        cockteileId,
      });
    });
    btn.setAttribute('data-add', 'remove-to-fav');
  } else if (btn?.dataset.add === 'remove-to-fav') {
    const cockteileId = btn.dataset.cocktaileid;
    onAuthStateChanged(auth, user => {
      removeUserData(user?.uid, cockteileId, 'coctailes');
    });
    btn.setAttribute('data-add', 'add-to-fav');
  }
}

export function writeRemovetCoctaileFunction(selector) {
  const favoriteBtn = document.querySelector(selector);

  favoriteBtn?.addEventListener('click', addToFav);
}
