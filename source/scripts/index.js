import { initMenu } from './burger-menu';
import { initModal } from './modal-window';
import { setInitialValueVideo } from './video';
import { initVideoSlider } from './slider-video';
import { reshuffleGallery, initGalleryAnimation } from './gallery';
import { initSlider } from './slider-welcome';
import { initExploreSlider } from './slider-explore';

initMenu();
initSlider();
initModal();
initExploreSlider();
setInitialValueVideo();
initVideoSlider();
reshuffleGallery();
initGalleryAnimation();
