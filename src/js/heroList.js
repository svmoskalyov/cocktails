import { getSearch } from './searchByLetter';
const ulList = document.querySelector('.hero__list');

ulList.addEventListener('click', getSearch);
