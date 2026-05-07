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

export { setInitialValueVideo };
