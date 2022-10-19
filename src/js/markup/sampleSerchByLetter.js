export function sampleSerchByLetter({ strDrinkThumb, strDrink, idDrink }) {
  return /*html*/ `
    <li class="gallery__card">
      <img src="${strDrinkThumb}" alt="${strDrink}" class="gallery__card-img" />
      <div class="gallery__card_thumb">
        <h3 class="gallery__card-name">${strDrink}</h3>
        <div class="btn__box">
          <button
            type="button"
            class="gallery__btn-load-more"
            data-open="open-modal-description"
            data-moreId="${idDrink}"
          >
            Learn more
          </button>
          <button
            type="button"
            class="gallery__btn-add-to-fav"
            data-add="add-to-fav"
            data-cocktaileId="${idDrink}"
          >
            Add to
          </button>
        </div>
      </div>
    </li>
     `;
}
