import { initMenu } from './burger-menu';
import { initModal } from './modal-window';
import { setInitialValueVideo } from './video';
import { initCastomPlayer } from './video-player';
import { initVideoSlider } from './slider-video';
import { reshuffleGallery, initGalleryAnimation } from './gallery';
import { initSlider } from './slider-welcome';
import { initExploreSlider } from './slider-explore';

initMenu();
initSlider();
initModal();
initExploreSlider();
setInitialValueVideo();

const castomPlayerAPI = initCastomPlayer();
initVideoSlider(castomPlayerAPI);
reshuffleGallery();
initGalleryAnimation();
