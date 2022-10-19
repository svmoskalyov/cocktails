import { cocktailsList } from './markup/sampleCoctaileCard';
import { sampleSerchByLetter } from './markup/sampleSerchByLetter';
import { getInfoByLetter } from './service/apiData';

const sorry = document.querySelector('[data-sorry]');
const ulList = document.querySelector('.hero__list');
const svg = document.querySelector('.datalist__svg');
const input = document.querySelector('.datalist__input');

let arrayLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

function markupList(arrayLetters) {
  const markup = arrayLetters.map(
    arrayLetters => /*html*/ `
      <li class="hero__item">
        <button class="hero__btn" type="button" data-type="${arrayLetters}">
          ${arrayLetters}
        </button>
      </li>
      `
  );
  ulList.innerHTML = markup.join('');
}

function fetch() {
  if (window.screen.width >= 768) {
    markupList(arrayLetters);
  }
}
fetch();

export function getSearch(e) {
  if (e.target.tagName !== 'BUTTON') return;
  const letter = e.target.dataset.type;
  getInfoByLetter(letter)
    .then(renderSearch)
    .catch(error => {
      console.log(error);
    });
}

function renderSearch(data) {
  if (!data.drinks) {
    cocktailsList.innerHTML = '';
    sorry.classList.remove('visually-hidden');
    return;
  }

  sorry.classList.add('visually-hidden');
  const markup = data.drinks.map(sampleSerchByLetter);
  cocktailsList.innerHTML = markup.join('');
}

let currentFocus = -1;

input.onfocus = function () {
  letters.style.display = 'block';
};

for (let option of letters.options) {
  option.onclick = function () {
    input.value = option.value;
    getInfoByLetter(input.value)
      .then(renderSearch)
      .catch(error => {
        console.log(error);
      });
    letters.style.display = 'none';
    if ((letters.style.display = 'none')) {
      input.style.backgroundColor = '#FD5103';
      input.style.color = '#FCFCFC';
      svg.style.fill = '#FCFCFC';
    }
  };
}

input.oninput = function () {
  currentFocus = -1;
  const text = input.value.toUpperCase();

  for (let option of letters.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  }
};

input.onkeydown = function (e) {
  if (e.keyCode === 40) {
    currentFocus += 1;
    addActive(letters.options);
  } else if (e.keyCode == 38) {
    currentFocus -= 1;
    addActive(letters.options);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      /*and simulate a click on the "active" item:*/
      if (letters.options) letters.options[currentFocus].click();
    }
  }
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add('active');
}

function removeActive(x) {
  for (let i = 0; i < x.length; i += 1) {
    x[i].classList.remove('active');
  }
}
