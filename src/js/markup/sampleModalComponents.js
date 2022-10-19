export async function sampleModalComponents({
  idIngredient,
  strIngredient,
  strDescription,
  strType,
  strABV,
}) {
  let string = '';

  if (strIngredient) {
    string += `<h2 class="description__title">${strIngredient}</h2>`;
  }
  if (strType) {
    string += `<h3 class="description__category">${strType}</h3>`;
  }
  if (strDescription) {
    string += `<p class="description__characteristic">${strDescription.substring(
      0,
      404
    )}</p>`;
  }
  if (strType) {
    string += `<li class="description__list">✶ Type: ${strType}</li>`;
  }
  if (strABV) {
    string += `<li class="description__list">✶ Alcohol by volume: ${strABV}</li>`;
  }
  return /*html*/ `
    <div class="description__backdrop">
      <div class="description ${localStorage.getItem('theme')}">
        <div class="wrapper_ingrd">
          <button type="button" autofocus class="btn--close" data-modal="close-ingred"><span class="btn--close--cross ${localStorage.getItem(
            'theme'
            )}">&#215</span>
          </button>
          ${string}
          <div class="ingred__modal-btn">
            <button type="button" class="modal__btnIng modal__btnJS" data-ingr='add-to-fav' data-ingridientname='${idIngredient}'>Add to favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
