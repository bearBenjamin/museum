const DIRECTION_NEXT = 1;
const DIRECTION_PREV = -1;

const initWelcomeSlider = (sliderElement) => {
  const sliderList = sliderElement.querySelector('.slider__list');

  if (!sliderList) {
    return;
  }

  const slides = sliderList.querySelectorAll('.slider__item');

  const prevBtn = sliderElement.querySelector('.slider__arrow-left');
  const nextBtn = sliderElement.querySelector('.slider__arrow-right');

  const paginationList = sliderElement.querySelector('.slider__pagination-list');
  const paginationItems = paginationList.querySelectorAll('.slider__pagination-item');

  const currentSlideCount = sliderElement.querySelector('.slider__current-count');

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

  const onClickSlider = (evt) => {
    if (isMoving) {
      return;
    }

    if (prevBtn && evt.target.closest('.slider__arrow-left')) {
      onControlClick(DIRECTION_PREV);
      return;
    }

    if (nextBtn && evt.target.closest('.slider__arrow-right')) {
      onControlClick(DIRECTION_NEXT);
      return;
    }

    const paginationBtn = evt.target.closest('.slider__pagination-btn');

    if(paginationBtn) {
      const item = paginationBtn.closest('.slider__pagination-item');
      // Быстро находим индекс нажатого элемента в коллекции пагинации
      const index = Array.from(paginationItems).indexOf(item);

      if (currentIndex === index + 1) {
        return;
      }

      currentIndex = index + 1;
      moveSlider();
    }
  };


  sliderElement.addEventListener('click', onClickSlider);

  sliderList.addEventListener('transitionend', onMoving);

  updatePagination();
};


export { initWelcomeSlider };
