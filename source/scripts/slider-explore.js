const initExploreSlider = () => {
  const slider = document.querySelector('.slider-explore');
  const beforeContainer = document.querySelector('.slider-explore__slider-inner--before');
  const toggle = document.querySelector('.slider-explore__slider-toggle');

  if (!slider || !beforeContainer || !toggle) {
    return;
  }

  let isResizing = false;

  // Функция изменения положения
  const updateSlider = (clientX) => {
  // Получаем границы слайдера
    const rect = slider.getBoundingClientRect();

    // Вычисляю позицию X относительно слайдера
    // let posX = x - (rect.left + window.scrollX);
    let posX = clientX - rect.left;


    // Ограничиваею, чтобы не выходило за края
    posX = Math.max(0, Math.min(posX, rect.width));

    // Перевожу в проценты
    const percent = (posX / rect.width) * 100;

    // Применяю стили
    beforeContainer.style.width = `${percent}%`;
    toggle.style.left = `${percent}%`;
  };

  // Событие нажатия
  const startResizing = () => {
    isResizing = true;
  };

  // Событие отпускания
  const stopResizing = () => {
    isResizing = false;
  };

  // Событие движения
  const handleMove = (e) => {
    if (!isResizing) {
      return;
    }

    if (e.type === 'touchmove') {
      e.preventDefault();
    }

    // Поддержка и мыши, и тачскрина
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  };

  toggle.addEventListener('mousedown', startResizing);
  toggle.addEventListener('touchstart', startResizing, { passive: false });

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: false });

  window.addEventListener('mouseup', stopResizing);
  window.addEventListener('touchend', stopResizing);
};

export { initExploreSlider };
