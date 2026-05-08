const DIRECTION_NEXT = 1;
const DIRECTION_PREV = -1;

const initSlider = () => {
  const sliderList = document.querySelector('.slider__list');

  if (!sliderList) {
    return;
  }

  const slides = sliderList.querySelectorAll('.slider__item');

  const prevBtn = document.querySelector('.slider__arrow-left');
  const nextBtn = document.querySelector('.slider__arrow-right');

  const paginationList = document.querySelector('.slider__pagination-list');
  const paginationItems = paginationList.querySelectorAll('.slider__pagination-item');

  const currentSlideCount = document.querySelector('.slider__current-count');

  const totalSlides = slides.length;
  let currentIndex = 1;
  let isMoving = false;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  sliderList.append(firstClone);
  sliderList.prepend(lastClone);

  sliderList.style.transform = 'translateX(-100%)';

  const moveSlider = () => {
    isMoving = true;
    sliderList.style.transition = 'transform 0.5s ease-in-out';
    sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const onControlClick = (direction) => {
    if (isMoving) {
      return;
    }
    currentIndex += direction;
    moveSlider();
  };

  const updatePagination = () => {
    paginationItems.forEach((item, index) => {
      const btn = item.querySelector('.slider__pagination-btn');
      if (btn) {
        btn.classList.toggle('slider__pagination-btn--current', index === currentIndex - 1);
      }
    });
  };

  const updateSlideCount = () => {
    currentSlideCount.textContent = currentIndex.toString().padStart(2, '0');
  };

  const onMoving = () => {
    isMoving = false;

    if (currentIndex === totalSlides + 1) {
      sliderList.style.transition = 'none';
      currentIndex = 1;
      sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (currentIndex === 0) {
      sliderList.style.transition = 'none';
      currentIndex = totalSlides;
      sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    updatePagination();
    updateSlideCount();
  };

  paginationItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (isMoving || currentIndex === index + 1) {
        return;
      }
      currentIndex = index + 1;
      moveSlider();
    });
  });

  prevBtn.addEventListener('click', () => onControlClick(DIRECTION_PREV));
  nextBtn.addEventListener('click', () => onControlClick(DIRECTION_NEXT));

  sliderList.addEventListener('transitionend', onMoving);

  updatePagination();
};

export { initSlider };
