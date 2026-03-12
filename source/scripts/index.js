const mainNav = document.querySelector('.main-nav__list');
const btnToggle = document.querySelector('.main-header__button');
const btnToggleText = document.querySelector('.button-toggle__text');

mainNav.classList.remove('main-nav__list--nojs');
btnToggle.classList.remove('main-header__button--nojs');

btnToggle.addEventListener('click', () => {
  if (mainNav.classList.contains('main-nav__list--close')) {
    mainNav.classList.remove('main-nav__list--close');
    mainNav.classList.add('main-nav__list--open');
    btnToggle.classList.remove('main-header__button--close');
    btnToggleText.textContent = 'Открыть меню';
  } else {
    mainNav.classList.add('main-nav__list--close');
    mainNav.classList.remove('main-nav__list--open');
    btnToggle.classList.add('main-header__button--close');
    btnToggleText.textContent = 'Закрыть меню';
  }
});
