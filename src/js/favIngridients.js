import { removeUserData, auth } from './service/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { openIngridientInfoModal } from './modalComponents';
import { getInfoAboutIngridient } from './service/apiData';
import { sampleFavIngr, preloader } from './markup/sampleFavIngr';

const favIngridientsList = document.querySelector('.f-ing_blocks');

export async function parseFavIngridients(array) {
  try {
    const getIngridientsData = await array.map(id =>
      getInfoAboutIngridient(id)
    );
    preloader?.classList.remove('visually-hidden');
    const response = await Promise.all(getIngridientsData);
    if (response.length > 0) {
      if (favIngridientsList) {
        favIngridientsList.innerHTML = getHtml(response);
      }
      openIngridientInfoModal('.f-ing_blocks');

      const favIngrList = document.querySelector('.f-ing_blocks');
      if (favIngrList?.childElementCount < 0) {
        favIngrList?.removeEventListener('click', removeFromFavIngr);
      } else {
        favIngrList?.addEventListener('click', removeFromFavIngr);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
}

function removeFromFavIngr(e) {
  const ingridientItem = e.target.dataset;
  if (ingridientItem?.remove) {
    const card = e.target.closest('.f-ing_items');
    card.remove();
    onAuthStateChanged(auth, user => {
      removeUserData(user.uid, ingridientItem?.ingridientname, 'ingredients');
    });
  }
}

function getHtml(response) {
  const responseData = response
    .filter(ingr => ingr.data.ingredients)
    .map(obj => obj.data.ingredients[0]);
  return responseData.map(obg => sampleFavIngr(obg)).join('');
}
