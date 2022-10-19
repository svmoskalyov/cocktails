export const cocktailsList = document.querySelector('.gallery__cards');
export const preloader = document.querySelector('.loader');
export const preloaderFav = document.querySelector('.preloader-fav-coc');
export const section = document.querySelector('.section-gallery');

export function sampleCoctaileCard({ strDrinkThumb, strDrink, idDrink }) {
  const markup = /*html*/ `
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

  cocktailsList?.insertAdjacentHTML('beforeend', markup);
  preloader?.classList.add('visually-hidden');
  preloaderFav?.classList.add('visually-hidden');
  section?.classList.remove('gallery__helper');
}
