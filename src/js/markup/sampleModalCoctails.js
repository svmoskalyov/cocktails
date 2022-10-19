export function sampleModalCoctails(obj) {
  const { strDrink, strInstructions, strDrinkThumb, idDrink } = obj;
  const array = Object.keys(obj);
  const filterArray = array
    .filter(key => !isNaN(+key[key.length - 1]))
    .map(key => obj[key])
    .filter(data => data);
  const ingridients = [];
  for (let i = 0; i < filterArray.length / 2; i++) {
    ingridients.push([filterArray[i], filterArray[filterArray.length - 1 - i]]);
  }
  const stringLi = ingridients
    .map(([ingridient, amount]) => {
      return /*html*/ `
<li
          class="ingredient__item"
          data-open="open-ingridient-description"
          data-ingridientname="${ingridient}"
        >
          <span class="ingredient__accent">✶</span>
          <span>${amount}</span>
          <a class="link ingredient-link">${ingridient}</a>
        </li>
            `;
    })
    .join('');
  return /*html*/ `
    <div class="backdrop__cocktail" data-modal>
      <div class="modal__cocktail ${localStorage.getItem('theme')}">
        <button type="button" autofocus class="btn--close" data-modal="close-cocktail"><span class="btn--close--cross ${localStorage.getItem(
          'theme'
        )}">&#215</span>
        </button>
        <h2 class="cocktail__name cocktail__name--mobile">${strDrink}</h2>
        <div class="modal__form">
          <div class="instraction__wrap">
            <h3 class="cocktail__title">Instractions:</h3>
            <p class="recipe__text">
              ${strInstructions}
            </p>
          </div>
          <div class="image__wrap"><img src='${strDrinkThumb}'></img></div>
          <div class="ingredients__wraper">
            <div class="recipe__wrapper">
              <h2 class="cocktail__name cocktail__name--big">${strDrink}</h2>
              <h4 class="recipe__title">INGREDIENTS</h4>
              <p class="cocktail__text">Per cocktail</p>
              <ul class="ingredients">
              ${stringLi}
                </li>
              </ul>
            </div>
          </div>
          <div class="cocktail__modal-btn">
          </div>
          
        </div>
        <button type="button" class="modal__btn modal__btnJS" data-add="add-to-fav" data-cocktaileid='${idDrink}'>Add to favorite</button>
      </div>
    </div>
`;
}
