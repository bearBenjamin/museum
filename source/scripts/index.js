const btnToggleTicket = document.querySelector('.ticket__toggle');
const bookingModal = document.querySelector('.booking-modal');
const btnToggleModal = document.querySelector('.form-ticket__button-close');

btnToggleTicket.addEventListener('click', () => {
  bookingModal.classList.add('booking-modal--open');
});

btnToggleModal.addEventListener('click', () => {
  bookingModal.classList.remove('booking-modal--open');
});
