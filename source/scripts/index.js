import { initMenu } from './burger-menu';
import { initModal } from './modal-window';
import { setInitialValueVideo } from './video';
import { reshuffleGallery, initGalleryAnimation } from './gallery';

initMenu();
initModal();
setInitialValueVideo();
reshuffleGallery();
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
