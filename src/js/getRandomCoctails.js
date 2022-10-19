import { checkedBtns } from './service/firebase';
import { writeRemovetCoctaileFunction } from './coctails';
import { openCoctaileInfoModal } from './modalCoctails';
import { randomCoctail } from './service/apiData';
import { sampleCoctaileCard } from './markup/sampleCoctaileCard';

const width = document.documentElement.clientWidth;

let randomDrinks = [];

async function fetchRandomCockteil(n) {
  try {
    for (let i = 0; i < n; i += 1) {
      randomDrinks.push(await randomCoctail());
    }
  } catch (error) {
    throw new Error(error);
  }
  getUniqueObj();
  checkedBtns(
    '[data-cocktaileid]',
    '/coctailes',
    'cocktaileid',
    'data-add',
    {
      atrOnDel: 'remove-to-fav',
      atrOnAdd: 'add-to-fav',
    },
    { contOnDel: 'remove', ContOnAdd: 'add to' }
  );

  openCoctaileInfoModal('.gallery__cards');
  writeRemovetCoctaileFunction('.gallery__cards');
}

function getUniqueObj() {
  const cocktailsUnique = randomDrinks.reduce(
    (acc, cocktail) => {
      if (acc.map[cocktail.data.drinks[0].idDrink]) return acc;
      acc.map[cocktail.data.drinks[0].idDrink] = true;
      acc.cocktailsUnique.push(cocktail);
      return acc;
    },
    {
      map: {},
      cocktailsUnique: [],
    }
  ).cocktailsUnique;

  cocktailsUnique.forEach(drink => {
    const data = drink.data.drinks[0];
    sampleCoctaileCard(data);
  });
  return cocktailsUnique;
}

if (width >= 1280) {
  fetchRandomCockteil(9);
} else if (width >= 768 && width < 1280) {
  fetchRandomCockteil(6);
} else if (width > 0 && width < 768) {
  fetchRandomCockteil(3);
}
