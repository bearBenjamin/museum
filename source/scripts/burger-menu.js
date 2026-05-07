const pageBody = document.querySelector('.page__body');
const navigationContainer = document.querySelector('.main-navigation__wrapper');
const listLink = document.querySelectorAll('.main-navigation__item-link');

const btnBurger = document.querySelector('.button-toggle');
const btnLabel = document.querySelector('.button-toggle__text');

const welcomeTitle = document.querySelector('.welcome__title');
const welcomeText = document.querySelector('.welcome__text');
const welcomeLink = document.querySelector('.welcome__link');

const welcomeElements = [welcomeTitle, welcomeText, welcomeLink];

const closeMenu = () => {
  pageBody.classList.remove('page__body--noscroll');
  btnBurger.classList.remove('button-toggle--close');
  btnBurger.classList.add('button-toggle--open');
  btnLabel.textContent = 'Open menu';
  navigationContainer.classList.remove('main-navigation__wrapper--open');
  navigationContainer.classList.add('main-navigation__wrapper--close');

  welcomeElements.forEach((element) => {
    element.style.zIndex = '2';
  });
};

const openMenu = () => {
  pageBody.classList.add('page__body--noscroll');
  btnBurger.classList.remove('button-toggle--open');
  btnBurger.classList.add('button-toggle--close');
  btnLabel.textContent = 'Close menu';
  navigationContainer.classList.remove('main-navigation__wrapper--close');
  navigationContainer.classList.add('main-navigation__wrapper--open');

  welcomeElements.forEach((element) => {
    element.style.zIndex = '0';
  });
};

const initNavigation = () => {
  listLink.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
};

const initMenu = () => {
  if (!btnBurger) {
    return;
  }

  btnBurger.addEventListener('click', () => {
    if (btnBurger.classList.contains('button-toggle--open')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  initNavigation();
};


export { initMenu };
