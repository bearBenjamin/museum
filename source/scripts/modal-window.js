const pageBody = document.querySelector('.page__body');
const btnToggleTicket = document.querySelector('.ticket__toggle');
const bookingModal = document.querySelector('.booking-modal');
const btnToggleModal = document.querySelector('.form-ticket__button-close');

const openModal = () => {
  bookingModal.classList.add('booking-modal--open');
  pageBody.classList.add('page__body--noscroll');
};

const closeModal = () => {
  bookingModal.classList.remove('booking-modal--open');
  pageBody.classList.remove('page__body--noscroll');
};

const initModal = () => {
  btnToggleTicket.addEventListener('click', () => {
    openModal();
  });

  btnToggleModal.addEventListener('click', () => {
    closeModal();
  });
};

export { initModal };
