// код для открытия закрытия бургер меню
const pageBody = document.querySelector('.page__body');
const mainNavigation = document.querySelector('.main-navigation__list');
const btnBurger = document.querySelector('.button-toggle');
const listLink = document.querySelectorAll('.main-navigation__item-link');
const welcomeTitle = document.querySelector('.welcome__title');
const welcomeText = document.querySelector('.welcome__text');
const welcomeLink = document.querySelector('.welcome__link');

btnBurger.addEventListener('click', () => {
  if (btnBurger.classList.contains('button-toggle--open')) {
    btnBurger.classList.remove('button-toggle--open');
    btnBurger.classList.add('button-toggle--close');
    mainNavigation.classList.remove('main-navigation__list--close');
    mainNavigation.classList.add('main-navigation__list--open');
    welcomeTitle.style.zIndex = '0';
    welcomeText.style.zIndex = '0';
    welcomeLink.style.zIndex = '0';
    pageBody.classList.add('page__body--noscroll');
  } else {
    btnBurger.classList.remove('button-toggle--close');
    btnBurger.classList.add('button-toggle--open');
    mainNavigation.classList.remove('main-navigation__list--open');
    mainNavigation.classList.add('main-navigation__list--close');
    welcomeTitle.style.zIndex = '2';
    welcomeText.style.zIndex = '2';
    welcomeLink.style.zIndex = '2';
    pageBody.classList.remove('page__body--noscroll');
  }
});

listLink.forEach((link) => {
  link.addEventListener('click', () => {
    btnBurger.classList.remove('button-toggle--close');
    btnBurger.classList.add('button-toggle--open');
    mainNavigation.classList.remove('main-navigation__list--open');
    mainNavigation.classList.add('main-navigation__list--close');
    welcomeTitle.style.zIndex = '2';
    welcomeText.style.zIndex = '2';
    welcomeLink.style.zIndex = '2';
    pageBody.classList.remove('page__body--noscroll');
  });
});


// код для открытия закрытия модального окна формы - header;
const btnToggleTicket = document.querySelector('.ticket__toggle');
const bookingModal = document.querySelector('.booking-modal');
const btnToggleModal = document.querySelector('.form-ticket__button-close');

btnToggleTicket.addEventListener('click', () => {
  bookingModal.classList.add('booking-modal--open');
});

btnToggleModal.addEventListener('click', () => {
  bookingModal.classList.remove('booking-modal--open');
});


// код для положения кружка на шкале прогресс-бара видеоплеера, чтобы попасть в макет на разных экранах - возможно потом придется убрать - section Video;
const progressInputVideo = document.querySelector('.player__progress-field');
const progressInputVolume = document.querySelector('.player__range-volume-field');

const updateProgressVideo = () => {
  const value = progressInputVideo.value;
  progressInputVideo.style.setProperty('--progress-cutoff-video', `${value }%`);
};

const updateProgressVolume = () => {
  const value = progressInputVolume.value;
  progressInputVolume.style.setProperty('--progress-cutoff-volume', `${value }%`);
};

const setInitialValueVideo = () => {
  const width = document.documentElement.clientWidth;

  if (width > 1024) {
    progressInputVideo.value = 53;
    progressInputVolume.value = 43;
  } else {
    progressInputVideo.value = 41;
    progressInputVolume.value = 39;
  }

  updateProgressVideo();
  updateProgressVolume();
};


if (progressInputVideo && progressInputVolume) {
  updateProgressVideo();
  updateProgressVolume();
  progressInputVideo.addEventListener('input', updateProgressVideo);
  progressInputVolume.addEventListener('input', updateProgressVolume);
  setInitialValueVideo();
}


// сохраняю Masonry для меньших экранов через JS - section Gallery;
const galleryList = document.querySelector('.gallery__list');
const items = Array.from(document.querySelectorAll('.gallery__item'));


const reshuffleGallery = () => {
  const width = document.documentElement.clientWidth;

  if (width > 1024) {
    galleryList.innerHTML = '';
    items.forEach((item) => galleryList.appendChild(item));
  } else {
    const newOrder = [items[5], items[0], items[14], items[8], items[12], items[10], items[6], items[4], items[9], items[1], items[13], items[7], items[2], items[3], items[11]];
    // 0, 1, 2, 3, 4, 5,  6, 7, 8, 9, 10, 11, , 13, 14

    galleryList.innerHTML = '';
    newOrder.forEach((item) => galleryList.appendChild(item));
  }
};

reshuffleGallery();
