import { save, load } from './storage';

const THEME_STORAGE_KEY = 'theme';
const inputRef = document.querySelector('.theme-switch__toggle');
const ligth = document.querySelector('.theme-switch-light');
const dark = document.querySelector('.theme-switch-dark');
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

initPage();
inputRef.addEventListener('change', onThemeSwitch);

function initPage() {
  const savedChecked = load(THEME_STORAGE_KEY);

  inputRef.checked = savedChecked;
  document.body.className = savedChecked ? Theme.DARK : Theme.LIGHT;

  inputRef.checked
    ? (dark.classList.add('theme-switch-active'),
      ligth.classList.remove('theme-switch-active'))
    : dark.classList.remove(
        'theme-switch-active',
        ligth.classList.add('theme-switch-active')
      );
}

function onThemeSwitch(event) {
  const { checked } = event.target;

  document.body.className = checked ? Theme.DARK : Theme.LIGHT;
  save(THEME_STORAGE_KEY, checked);

  checked
    ? (dark.classList.add('theme-switch-active'),
      ligth.classList.remove('theme-switch-active'))
    : dark.classList.remove(
        'theme-switch-active',
        ligth.classList.add('theme-switch-active')
      );
}
