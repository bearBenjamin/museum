const DIRECTION_NEXT = 1;
const DIRECTION_PREV = -1;
const BREAKPOINT = 1024;
const TABLET = 768;
const SLIDES_TO_SHOW = 3;

const initVideoSlider = (castomPlayerAPI) => {
  if (!castomPlayerAPI) {
    return;
  }

  const mainVideo = document.querySelector('#my-player');

  const sliderList = document.querySelector('.video-slider__list');
  const slides = sliderList.querySelectorAll('.video-slider__item');

  const prevBtn = document.querySelector('.video-slider__pagination-item-arrow--left');
  const nextBtn = document.querySelector('.video-slider__pagination-item-arrow--right');

  const paginationList = document.querySelector('.video-slider__pagination');
  const allPaginationItems = paginationList.querySelectorAll('.video-slider__pagination-item');

  const paginationDots = Array.from(allPaginationItems).slice(1, -1);

  const totalSlides = slides.length;

  let currentIndex = SLIDES_TO_SHOW;
  let isMoving = false;

  const getLogicalIndex = (domIndex) => {
    const index = (domIndex - SLIDES_TO_SHOW) % totalSlides;
    return index < 0 ? index + totalSlides : index;
  };

  const getCurrentActiveIndex = () => {
    const index = (currentIndex - SLIDES_TO_SHOW) % totalSlides;
    return index < 0 ? index + totalSlides : index;
  };

  const firstClones = Array.from(slides).slice(0, SLIDES_TO_SHOW);
  const lastClones = Array.from(slides).slice(-SLIDES_TO_SHOW);

  firstClones.forEach((clone) => sliderList.append(clone.cloneNode(true)));
  lastClones.reverse().forEach((clone) => sliderList.prepend(clone.cloneNode(true)));

  const allSlides = Array.from(sliderList.children);

  const getSlideVideoData = (slide) => {
    const data = slide.querySelector('video');
    if (!data) {
      return null;
    }

    return {
      src: data.getAttribute('src'),
      poster: data.getAttribute('poster')
    };
  };

  const syncVideo = () => {
    if (!mainVideo) {
      return;
    }

    const currentSlide = allSlides[currentIndex];
    const dataVideo = getSlideVideoData(currentSlide);

    if (!dataVideo || !dataVideo.src) {
      castomPlayerAPI.reset();
      return;
    }

    if (mainVideo.getAttribute('src') !== dataVideo.src) {
      castomPlayerAPI.change(dataVideo.src, dataVideo.poster);
    }
  };

  const stopAllCarouselVideos = (currentVideo = null) => {
    const allVideos = sliderList.querySelectorAll('video');
    allVideos.forEach((video) => {
      if (video !== currentVideo) {
        video.pause();
        video.load();

        const container = video.closest('.video-slider__item');
        if (container) {
          container.classList.remove('video-slider__item--playing');
        }
      }
    });
  };

  const playCarouselVideo = (video, container) => {
    stopAllCarouselVideos(video); // Останавливаю видео слайдера
    castomPlayerAPI.pause(); // Останавливаю большой плеер

    if (video.readyState === 0) {
      video.load(); // Принудительная загрузка
    }

    const playPromise = video.play();

    // play() возвращает Promise. Обрабатываю. Проверка на случай браузера, который на работает с новым возвратом play() - раньше не возвращал промис
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Успешный старт
          container.classList.add('video-slider__item--playing');
        })
        .catch((error) => {
          // Ошибка (например, автозапуск заблокирован браузером)
          // eslint-disable-next-line no-console
          console.warn('Воспроизведение прервано:', error);
          container.classList.remove('video-slider__item--playing');
        });
    }
  };

  const pauseCarouselVideo = (video, container) => {
    video.pause();
    container.classList.remove('video-slider__item--playing');
  };

  const initCarouselVideoControl = () => {
    sliderList.addEventListener('click', (evt) => {
      const playBtn = evt.target.closest('.video-slider__item-btn');
      if (!playBtn) {
        return;
      }

      const container = playBtn.closest('.video-slider__item');
      const video = container.querySelector('video');

      if (!video) {
        return;
      }

      if (video.paused) {
        playCarouselVideo(video, container);
      } else {
        pauseCarouselVideo(video, container);
      }
    });
  };

  const getOffset = (index) => {
    const containerWidth = sliderList.parentElement.clientWidth;
    const targetSlide = allSlides[index];
    const nextSlide = allSlides[index + 1];

    if (window.innerWidth >= BREAKPOINT) {
      return targetSlide.offsetLeft;
    }

    const gap = nextSlide.offsetLeft - (targetSlide.offsetLeft + targetSlide.offsetWidth);
    const jointPoint = nextSlide.offsetLeft - (gap / 2);
    return jointPoint - (containerWidth / 2);
  };

  const updateActiveClasses = () => {
    const width = window.innerWidth;
    const isTargetWidth = width < BREAKPOINT && width > TABLET;

    // Если не в том диапазоне, чищу за один проход и выхожу
    if (!isTargetWidth) {
      allSlides.forEach((slide) =>
        slide.classList.remove('video-slider__item--is-active')
      );
      return;
    }

    // Считаю активные индексы один раз
    const activeIndex = getCurrentActiveIndex();
    const nextActiveIndex = (activeIndex + 1) % totalSlides;

    // Один цикл для всех действий
    allSlides.forEach((slide, domIndex) => {
      const logicIndex = getLogicalIndex(domIndex);

      const isActive = logicIndex === activeIndex || logicIndex === nextActiveIndex;

      slide.classList.toggle('video-slider__item--is-active', isActive);
    });
  };

  const updatePagination = () => {
    const activeIndex = getCurrentActiveIndex();

    paginationDots.forEach((item, index) => {
      const btn = item.querySelector('.video-slider__pagination-item-btn');
      if (btn) {
        btn.classList.toggle('video-slider__pagination-item-btn--current', index === activeIndex);
      }
    });
  };

  const moveSlider = (withAnimation = true) => {
    isMoving = withAnimation;

    sliderList.style.transition = withAnimation ? 'transform 0.5s ease-in-out' : 'none';

    const offset = getOffset(currentIndex);

    sliderList.style.transform = `translateX(-${offset}px)`;

    stopAllCarouselVideos();
    syncVideo();

    updateActiveClasses();
    updatePagination();
  };

  const onControlClick = (direction) => {
    if (isMoving) {
      return;
    }
    currentIndex += direction;
    moveSlider();
  };

  const onMoving = () => {
    isMoving = false;

    if (currentIndex >= totalSlides + SLIDES_TO_SHOW) {
      sliderList.style.transition = 'none';
      currentIndex = SLIDES_TO_SHOW;
      moveSlider(false);
    }

    if (currentIndex <= SLIDES_TO_SHOW - 1) {
      sliderList.style.transition = 'none';
      currentIndex = totalSlides + SLIDES_TO_SHOW - 1;
      moveSlider(false);
    }

    updatePagination();
  };

  const onResize = () => {
    moveSlider(false);
  };

  const onPaginationClick = (index) => {
    const currentActiveIndex = getCurrentActiveIndex();

    if (isMoving || currentActiveIndex === index) {
      return;
    }

    if (currentActiveIndex === totalSlides - 1 && index === 0) {
      currentIndex = totalSlides + SLIDES_TO_SHOW; // вперед к клону первого слайда
    } else if (currentActiveIndex === 0 && index === totalSlides - 1) {
      currentIndex = SLIDES_TO_SHOW - 1; // назад к клону последнего слайда
    } else {
      currentIndex = index + SLIDES_TO_SHOW;
    }

    moveSlider();
  };

  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => onPaginationClick(index));
  });

  prevBtn.addEventListener('click', () => {
    onControlClick(DIRECTION_PREV);
  });

  nextBtn.addEventListener('click', () => {
    onControlClick(DIRECTION_NEXT);
  });

  sliderList.addEventListener('transitionend', onMoving);

  window.addEventListener('resize', onResize);

  // слушаю кастомное событие плеера
  window.addEventListener('mainVideoPlay', () => {
    stopAllCarouselVideos();
  });


  initCarouselVideoControl();
  onResize();
  updatePagination();

};

export { initVideoSlider };
