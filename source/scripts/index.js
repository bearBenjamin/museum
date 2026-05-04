// код для открытия закрытия бургер меню
const pageBody = document.querySelector('.page__body');
const navigationContainer = document.querySelector('.main-navigation__wrapper');
const listLink = document.querySelectorAll('.main-navigation__item-link');

const btnBurger = document.querySelector('.button-toggle');
const btnLabel = document.querySelector('.button-toggle__text');

const welcomeTitle = document.querySelector('.welcome__title');
const welcomeText = document.querySelector('.welcome__text');
const welcomeLink = document.querySelector('.welcome__link');

btnBurger.addEventListener('click', () => {
  if (btnBurger.classList.contains('button-toggle--open')) {
    btnBurger.classList.remove('button-toggle--open');
    btnBurger.classList.add('button-toggle--close');
    btnLabel.textContent = 'Close menu';
    navigationContainer.classList.remove('main-navigation__wrapper--close');
    navigationContainer.classList.add('main-navigation__wrapper--open');
    welcomeTitle.style.zIndex = '0';
    welcomeText.style.zIndex = '0';
    welcomeLink.style.zIndex = '0';
    pageBody.classList.add('page__body--noscroll');
  } else {
    btnBurger.classList.remove('button-toggle--close');
    btnBurger.classList.add('button-toggle--open');
    btnLabel.textContent = 'Open menu';
    navigationContainer.classList.remove('main-navigation__wrapper--open');
    navigationContainer.classList.add('main-navigation__wrapper--close');
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
    navigationContainer.classList.remove('main-navigation__wrapper--open');
    navigationContainer.classList.add('main-navigation__wrapper--close');
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
  pageBody.classList.add('page__body--noscroll');
});

btnToggleModal.addEventListener('click', () => {
  bookingModal.classList.remove('booking-modal--open');
  pageBody.classList.remove('page__body--noscroll');
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
  } else if (width > 768 && width <= 1024) {
    progressInputVideo.value = 41;
    progressInputVolume.value = 39;
  } else if (width > 420 && width <= 768) {
    progressInputVideo.value = 31;
    progressInputVolume.value = 40;
  } else {
    progressInputVideo.value = 40;
    progressInputVolume.value = 39.5;
  }

  // console.log('progressInputVideo.value: ', progressInputVideo.value);

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
// console.log('galleryList: ', galleryList);
const items = Array.from(document.querySelectorAll('.gallery__item'));
// console.log('items: ', items);


const reshuffleGallery = () => {
  const width = document.documentElement.clientWidth;

  if (width > 1024) {
    galleryList.innerHTML = '';
    items.forEach((item) => galleryList.appendChild(item));
  } else if (width > 768 && width <= 1024) {
    const newOrder = [items[5], items[0], items[14], items[8], items[12], items[10], items[6], items[4], items[9], items[1], items[13], items[7], items[2], items[3], items[11]];
    // 0, 1, 2, 3, 4, 5,  6, 7, 8, 9, 10, 11, 12, 13, 14

    galleryList.innerHTML = '';
    newOrder.forEach((item) => galleryList.appendChild(item));
  } else if (width > 420 && width <= 768) {
    const newOrder = [items[2], items[10], items[14], items[0], items[3], items[5], items[6], items[4], items[13], items[1], items[7], items[8], items[9], items[11], items[12]];
    // 1, 2, 4, 10, 13, 14
    // 0, 3, 5, 6 --- 7, 8, 9, 11, 12
    galleryList.innerHTML = '';
    newOrder.forEach((item) => galleryList.appendChild(item));
  } else {
    const newOrder = [items[10], items[8], items[9], items[3], items[4], items[5], items[6], items[1], items[11], items[13], items[2], items[7], items[12], items[14], items[0]];
    // 10, 8, 9, 1, 11, 13, 2
    // (9), 3 , 4, 5, 6, (2), 7, 12, 14, 0
    galleryList.innerHTML = '';
    newOrder.forEach((item) => galleryList.appendChild(item));
  }
};

reshuffleGallery();


//анимация галереи
const isGalleryReady = () => {
  if (items.length === 0) {
    return false;
  }

  if (!document.documentElement.classList.contains('page--js')) {
    return false;
  }

  items.forEach((item) => {
    item.classList.add('gallery__item--js');
  });

  return true;
};

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateGalleryPicture = (item) => {
  const randomDelay = (Math.random() * 0.4).toFixed(1);
  item.style.transitionDelay = `${randomDelay}s`;
  item.classList.add('gallery__item--animated');
};

const handleIntersecting = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const item = entry.target;
      animateGalleryPicture(item);
      observer.unobserve(item);
    }
  });
};

const initGalleryAnimation = () => {
  const ready = isGalleryReady();

  if (!ready) {
    return;
  }

  const observer = new IntersectionObserver(handleIntersecting, observerOptions);

  items.forEach((item) => observer.observe(item));
};

initGalleryAnimation();


/* слайдер от 1023 до 767
const sliderList = document.querySelector('.video-slider__list');
const slides = Array.from(document.querySelectorAll('.video-slider__item'));
const btnPrev = document.querySelector('.video-slider__pagination-item-arrow--left');
const btnNext = document.querySelector('.video-slider__pagination-item-arrow--right');

let currentIndex = 0; // Индекс первого видимого слайда

function updateSlider() {
  const isTransitionRange = window.innerWidth <= 1023 && window.innerWidth >= 768;

  // 1. Получаем актуальную ширину слайда и gap (которые на clamp в CSS)
  const slideWidth = slides[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(sliderList).gap) || 0;

  // 2. Рассчитываем смещение
  // На планшете мы шагаем по одному слайду, но видим два
  const offset = currentIndex * (slideWidth + gap);
  sliderList.style.transform = `translateX(-${offset}px)`;

  // 3. Обновляем классы активности (для кликабельности и opacity)
  slides.forEach((slide, index) => {
    slide.classList.remove('is-active');

    if (isTransitionRange) {
      // В диапазоне 1023-768 активны текущий и следующий
      if (index === currentIndex || index === currentIndex + 1) {
        slide.classList.add('is-active');
      }
    } else {
      // Для desktop (выше 1024) активны три
      if (index >= currentIndex && index <= currentIndex + 2) {
        slide.classList.add('is-active');
      }
    }
  });
}

// Кнопка Вперед
btnNext.addEventListener('click', () => {
  const visibleCount = window.innerWidth <= 1023 ? 2 : 3;
  if (currentIndex < slides.length - visibleCount) {
    currentIndex++;
    updateSlider();
  }
});

// Кнопка Назад
btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Пересчет при ресайзе (чтобы clamp подхватывался сразу)
window.addEventListener('resize', updateSlider);

// Инициализация
updateSlider();

*/

/* c учетом кликов по пагинации будет как то так
const paginationBtns = document.querySelectorAll('.video-slider__pagination-item-btn');

// Функция для обновления активной точки
function updatePagination() {
  paginationBtns.forEach((btn, index) => {
    if (index === currentIndex) {
      btn.classList.add('video-slider__pagination-item-btn--current');
    } else {
      btn.classList.remove('video-slider__pagination-item-btn--current');
    }
  });
}

// Вешаем события на каждую точку
paginationBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // Проверяем, не выходим ли мы за пределы (чтобы не показывать пустоту в конце)
    const visibleCount = window.innerWidth <= 1023 ? 2 : 3;

    if (index <= slides.length - visibleCount) {
      currentIndex = index;
    } else {
      // Если нажали на точку, которая дальше возможного,
      // перематываем на максимально доступный индекс
      currentIndex = slides.length - visibleCount;
    }

    updateSlider();
    updatePagination();
  });
});

// Не забудь вызвать updatePagination() внутри основной функции updateSlider(),
// чтобы точки переключались и при клике на стрелки!
function updateSlider() {
  // ... (весь предыдущий код расчета offset и классов is-active) ...

  // Блокировка стрелок (визуальный фидбек)
  const visibleCount = window.innerWidth <= 1023 ? 2 : 3;

  btnPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
  btnPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

  const isEnd = currentIndex >= slides.length - visibleCount;
  btnNext.style.opacity = isEnd ? '0.3' : '1';
  btnNext.style.pointerEvents = isEnd ? 'none' : 'auto';

  updatePagination(); // Синхронизируем точки
}

// В начале скрипта убедись, что количество видео зафиксировано
const visibleCount = () => window.innerWidth <= 1023 ? 2 : 3;

// Обнови логику клика по точкам, чтобы она была универсальной
paginationBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const maxIndex = slides.length - visibleCount();

    // Если индекс кнопки больше, чем мы можем пролистать — ставим максимум
    currentIndex = index > maxIndex ? maxIndex : index;

    updateSlider();
  });
});

*/
