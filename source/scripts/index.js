import { initMenu } from './burger-menu';
import { initModal } from './modal-window';
import { initWelcomeSlider } from './slider-welcome';
import { initExploreSlider } from './slider-explore';
import { setInitialValueVideo } from './video';
import { initCastomPlayer } from './video-player';
import { initVideoSlider } from './slider-video';
import { reshuffleGallery, initGalleryAnimation } from './gallery';
import { initTicketForm } from './form-controller';
import './map.js';

document.documentElement.classList.add('page--js');

const welcomeSliderElement = document.querySelector('.slider');

initMenu();

if (welcomeSliderElement) {
  initWelcomeSlider(welcomeSliderElement);
}

initModal();
initExploreSlider();
setInitialValueVideo();

const castomPlayerAPI = initCastomPlayer();
initVideoSlider(castomPlayerAPI);
reshuffleGallery();
initGalleryAnimation();

initTicketForm();
