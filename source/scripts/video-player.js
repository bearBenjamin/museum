const video = document.querySelector('#my-player');
const progressBarVideo = document.querySelector('#video');

const resetPlayer = () => {
  if (!video) {
    return;
  }
  video.pause(); // Останавливаем
  video.currentTime = 0; // Скидываем время на начало
  if (progressBarVideo) {
    progressBarVideo.value = 0; // Скидываем ползунок
  }
};

const changeVideo = (src, poster) => {

  if (!video || video.src.includes(src)) {
    return;
  }

  video.src = src;
  video.poster = poster;
  video.load();
  resetPlayer();
};

const pauseMainVideo = () => {
  video.pause();
  // надо будет добавить логику обновления кнопки Play основного видео в плееру - updatePlayButtonIcon()
};

export { resetPlayer, changeVideo, pauseMainVideo };

