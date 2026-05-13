const initCastomPlayer = () => {
  const playerContainer = document.querySelector('.player');
  const video = document.querySelector('#my-player');

  if (!playerContainer || !video) {
    return null;
  }

  const playVideo = document.querySelector('.player__toggle-play');
  const playVideoText = document.querySelector('.player__toggle-play-text');

  const playVideoPanel = document.querySelector('.player__btn-play');
  const playVideoTextPanel = document.querySelector('.player__btn-play-text');

  const progressBarVideoPanel = document.querySelector('#video');
  const playVolumePanel = document.querySelector('.player__btn-volume');
  const progressBarVolumePanel = document.querySelector('#volume');
  const fullScreenBtn = document.querySelector('.player__btn-full-screen');

  let lastVolume = 0.5;

  const pauseMainVideo = () => {
    video.pause();
    // надо будет добавить логику обновления кнопки Play основного видео в плееру - updatePlayButtonIcon() или не надо вроде все норм
  };

  const updateInputBackground = (input) => {
    const percentage = (input.value / input.max) * 100;
    const variableName = input.id === 'video' ? '--progress-cutoff-video' : '--progress-cutoff-volume';

    input.style.setProperty(variableName, `${percentage}%`);
  };

  const updatePlayIcons = () => {
    if (video.paused) {
      playVideo.classList.remove('player__toggle-play--pause');
      playVideoText.textContent = 'Button play';
      playVideoPanel.classList.remove('player__btn-play--pause');
      playVideoTextPanel.textContent = 'Button play';
    } else {
      playVideo.classList.add('player__toggle-play--pause');
      playVideoText.textContent = 'Button pause';
      playVideoPanel.classList.add('player__btn-play--pause');
      playVideoTextPanel.textContent = 'Button pause';
    }
  };

  const updateVolumeIcon = () => {
    if (video.muted || video.volume === 0) {
      playVolumePanel.classList.add('player__btn-volume--muted');
    } else {
      playVolumePanel.classList.remove('player__btn-volume--muted');
    }
  };

  const handleTimeUpdate = () => {
    if (progressBarVideoPanel && video.duration) {
      const value = (video.currentTime / video.duration) * 100;
      progressBarVideoPanel.value = value;
      updateInputBackground(progressBarVideoPanel);
    }
  };

  const handleSeek = () => {
    const time = (progressBarVideoPanel.value / 100) * video.duration;
    video.currentTime = time;
  };

  const togglePlay = () => {
    if (video.paused) {
      // кастомное событие, нужно чтобы отключить проигрывание видео в слайдере при включении видео в плеере
      const playEvent = new CustomEvent('mainVideoPlay');
      window.dispatchEvent(playEvent);

      video.play();
    } else {
      video.pause();
    }
    updatePlayIcons();
  };

  const handleVolumeChange = () => {
    const value = progressBarVolumePanel.value;
    video.volume = value / 100;
    video.muted = video.volume === 0;
    updateInputBackground(progressBarVolumePanel);
    updateVolumeIcon();
  };

  const toggleMute = () => {
    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = lastVolume || 0.5;
      progressBarVolumePanel.value = video.volume * 100;
    } else {
      lastVolume = video.volume;
      video.muted = true;
      video.volume = 0;
      progressBarVolumePanel.value = 0;
    }
    updateVolumeIcon();
    updateInputBackground(progressBarVolumePanel);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      fullScreenBtn?.classList.add('player__btn-full-screen--active');
    } else {
      fullScreenBtn?.classList.remove('player__btn-full-screen--active');
    }
  });

  const resetPlayer = () => {
    if (!video) {
      return;
    }
    video.pause(); // Останавливаю
    video.currentTime = 0; // Скидываю время на начало
    if (progressBarVideoPanel) {
      progressBarVideoPanel.value = 0; // Скидываю ползунок
      updateInputBackground(progressBarVideoPanel);
    }

    updatePlayIcons();
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

  playVideo.addEventListener('click', togglePlay);
  playVideoPanel.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay); // надо ли вот в чем вопрос

  playVolumePanel.addEventListener('click', toggleMute);
  fullScreenBtn.addEventListener('click', toggleFullScreen);

  video.addEventListener('timeupdate', handleTimeUpdate);
  video.addEventListener('play', updatePlayIcons);
  video.addEventListener('pause', updatePlayIcons);
  video.addEventListener('ended', resetPlayer);

  progressBarVideoPanel.addEventListener('input', handleSeek);
  progressBarVolumePanel?.addEventListener('input', handleVolumeChange);

  return {
    reset: resetPlayer,
    change: changeVideo,
    pause: pauseMainVideo
  };
};

export { initCastomPlayer };
