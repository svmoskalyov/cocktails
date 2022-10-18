// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { gerInfoByName } from './apiData';
import {
  sampleCoctaileCard,
  cocktailsList,
} from './sampleCoctaileCard';

const form = document.querySelector('.search-form');
const sorry = document.querySelector('[data-sorry]');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const { searchQuery } = e.currentTarget.elements;
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return Notify.failure('You not input query.');
  }

  cocktailsList.innerHTML = '';

  gerInfoByName(query)
    .then(res => {
      return res.data;
    })
    .then(data => {
      if (!data.drinks) {
        sorry.classList.remove('visually-hidden');
        return;
      }

      sorry.classList.add('visually-hidden');
      data.drinks.forEach(drink => {
        sampleCoctaileCard(drink);
      });
    });
}
