import { state } from './form-state.js';
import { changeTicketType, changeTicketQuantity, updateUserData } from './form-state.js';
import { updateInterface, renderDateSelectOptions, renderTimeSelectOptions, showInputError, clearAllErrors } from './form-view';
import { generateDateSlots, generateTimeSlots, maskCardNumber, maskCardMonth, maskCardYear, maskCardCvc, maskCardName, validateUserName, validateUserEmail, validateUserPhone, validateCardNumber, validateCardMonth, validateCardYearField, validateCardNameField, validateCardCvcField, debounce } from './form-utils.js';

const amountTicketField = document.querySelector('.ticket__filter-group-amount');
const modalAmounTicketField = document.querySelector('.form-part-one__filter-group--count-ticket');
const dateFieldset = document.querySelector('.form-part-one__filter-group--date');
const infoUserFieldset = document.querySelector('.form-part-one__filter-group--info-user');
const typeTicketField = document.querySelector('.ticket__filter-group-type');
const cardFieldset = document.querySelector('.form-part-two__inner-two');
const cvcFieldset = document.querySelector('.form-part-two__inner-three');

const ticketForm = document.querySelector('#form-buy-ticket');
const closeFormButton = document.querySelector('.form-ticket__button-close');

const debouncedUpdateInterface = debounce(() => {
  updateInterface();
}, 250);

const handleFieldChange = (evt) => {
  const { name, value } = evt.target;

  if (!name) {
    return;
  }

  if (name === 'ticket-type') {
    changeTicketType(value);
  } else if (name === 'date' && value) {
    updateUserData(name, value);

    const freshSlots = generateTimeSlots(value);
    renderTimeSelectOptions(freshSlots);

    updateUserData('time', '');
  } else {
    updateUserData(name, value);
    debouncedUpdateInterface();
  }

  updateInterface();
};

const handleCardInputChange = (evt) => {
  const { name, value } = evt.target;

  if (!name) {
    return;
  }

  let formattedValue = value;
  let stateKey = '';
  switch (name) {
    case 'card-number':
      formattedValue = maskCardNumber(value);
      stateKey = 'cardNumber';
      break;
    case 'date-card':
      formattedValue = maskCardMonth(value);
      stateKey = 'cardMonth';
      break;
    case 'year-card':
      formattedValue = maskCardYear(value);
      stateKey = 'cardYear';
      break;
    case 'card-name':
      formattedValue = maskCardName(value);
      stateKey = 'cardName';
      break;
    case 'cvc':
      formattedValue = maskCardCvc(value);
      stateKey = 'cardCvv';
      break;
    default:
      return;
  }

  updateUserData(stateKey, formattedValue);
  updateInterface();
};

const getTypeTicket = (evt) => {
  if (evt.target.type === 'radio') {
    changeTicketType(evt.target.value);
    updateInterface();
  }
};

const getQuantityTicket = (evt) => {
  evt.preventDefault();

  const btn = evt.target.closest('button');

  if (!btn) {
    return;
  }

  const container = btn.closest('[data-type]');

  if (!container) {
    return;
  }

  const key = container.dataset.type;
  const delta = btn.className.includes('decrease') ? -1 : 1;

  changeTicketQuantity(key, delta);
  updateInterface();

};

const validateForm = () => {
  // Проверяем каждое поле на основе данных из нашего state
  const isNameValid = validateUserName(state.name);
  const isEmailValid = validateUserEmail(state.mail); // в вашем стейте это поле называется mail
  const isPhoneValid = validateUserPhone(state.phone);

  const isCardNumberValid = validateCardNumber(state.cardNumber);
  const isCardMonthValid = validateCardMonth(state.cardMonth);
  const isCardYearValid = validateCardYearField(state.cardYear);
  const isCardNameValid = validateCardNameField(state.cardName);
  const isCardCvcValid = validateCardCvcField(state.cardCvv);

  // Просим Вью отобразить или стереть ошибки на экране
  showInputError('name', isNameValid);
  showInputError('mail', isEmailValid);
  showInputError('phone', isPhoneValid);

  showInputError('card-number', isCardNumberValid);
  showInputError('date-card', isCardMonthValid);
  showInputError('year-card', isCardYearValid);
  showInputError('card-name', isCardNameValid);
  showInputError('cvc', isCardCvcValid);

  // Форма считается успешной только если ВСЕ поля верны
  return (
    isNameValid && isEmailValid && isPhoneValid &&
    isCardNumberValid && isCardMonthValid && isCardYearValid && isCardNameValid && isCardCvcValid
  );
};

const handleFormSubmit = (evt) => {
  // Запускаем валидацию
  const isFormValid = validateForm();

  // Если валидация не прошла — отменяем отправку формы на сервер
  if (!isFormValid) {
    evt.preventDefault();
    return;
  }

  // Если всё отлично — код идет дальше (здесь можно сделать AJAX/fetch запрос)
  // eslint-disable-next-line no-alert
  alert('Success! Tickets booked.');
};

const initTicketForm = () => {
  const dateSlots = generateDateSlots();
  renderDateSelectOptions(dateSlots);

  const initialSlots = generateTimeSlots('');
  renderTimeSelectOptions(initialSlots);

  typeTicketField.addEventListener('change', getTypeTicket);
  amountTicketField.addEventListener('click', getQuantityTicket);
  modalAmounTicketField.addEventListener('click', getQuantityTicket);
  dateFieldset.addEventListener('change', handleFieldChange);
  infoUserFieldset.addEventListener('input', handleFieldChange);
  cardFieldset.addEventListener('input', handleCardInputChange);
  cvcFieldset.addEventListener('input', handleCardInputChange);

  ticketForm.addEventListener('submit', handleFormSubmit);
  closeFormButton?.addEventListener('click', () => {
    clearAllErrors();
    ticketForm.reset();
  });

  updateInterface();
};

export { initTicketForm };
