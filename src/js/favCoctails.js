import { removeUserData, auth } from './service/firebase';
import { openCoctaileInfoModal } from './modalCoctails';
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoAboutCoctail } from './service/apiData';
import { sampleFacCoc } from './markup/sampleFacCoc';

const favCoctailesList = document.querySelector('.favorite__coctails');

export async function parseFavCoctails(array) {
  try {
    const getCocktailesData = await array.map(id => getInfoAboutCoctail(id));
    const response = await Promise.all(getCocktailesData);
    if (response.length > 0) {
      const htmlStringMarkup = getHtml(response);
      if (favCoctailesList) {
        favCoctailesList.innerHTML = htmlStringMarkup;
        if (favCoctailesList?.childElementCount < 1) {
          favCoctailesList?.removeEventListener('click', removeFromFavCoc);
        } else {
          favCoctailesList?.addEventListener('click', removeFromFavCoc);
        }
      }
      openCoctaileInfoModal('.favorite__coctails');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function removeFromFavCoc(e) {
  const ingridientItem = e.target.dataset;
  if (ingridientItem?.remove) {
    const card = e.target.closest('.gallery__card');
    card.remove();
    onAuthStateChanged(auth, user => {
      removeUserData(user.uid, ingridientItem?.cocktaileid, 'coctailes');
    });
  }
}

function getHtml(response) {
  const responseData = response
    .filter(ingr => ingr.data.drinks)
    .map(obj => obj.data.drinks[0]);
  return responseData.map(obg => sampleFacCoc(obg)).join('');
}
