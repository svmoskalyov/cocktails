export const preloader = document.querySelector('.preloader-fav-coc');

export function sampleFavIngr({
  strIngredient,
  strType,
  strABV,
  idIngredient,
}) {
  preloader?.classList.add('visually-hidden');
  let string = '';
  if (strABV) {
    string += `Vol: ${strABV}°`;
  }
  return /*html*/ `
    <li class="f-ing_items">
      <div class="f-ing_item__wrapper">
        <div>
          <h3 class="f-ing_subtitle">${strIngredient}</h3>
          <p class="f-ing_text">${strType ?? 'Other'}</p>
        </div>
        <div class="f-ing-indicator">${string}</div>
      </div>
      <div class="f-ing_btn">
        <button
          type="button"
          class="f-ing_btn-add"
          data-open="open-ingridient-description"
          data-ingridientname="${strIngredient}"
        >
          Learn More
        </button>
        <button
          type="button"
          class="f-ing_btn-rem"
          data-remove="true"
          data-ingridientname="${idIngredient}"
        >
          Remove
        </button>
      </div>
    </li>
        `;
}
