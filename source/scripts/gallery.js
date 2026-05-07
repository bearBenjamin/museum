const galleryList = document.querySelector('.gallery__list');
const items = Array.from(document.querySelectorAll('.gallery__item'));

// сохраняю Masonry для меньших экранов через JS - section Gallery;
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

export { reshuffleGallery, initGalleryAnimation };
