import { state, getCurrentPrices, calculateRowSum, calculateTotalSum } from './form-state.js';

const TYPE_TITLES = {
  permanent: 'Permanent exhibition',
  temporary: 'Temporary exhibition',
  combined: 'Combinde admission'
};

const ERROR_MESSAGES = {
  name: 'Name must be 3-15 characters long and contain only letters and spaces.',
  mail: 'Email must look like username@example.com.',
  phone: 'Phone must contain only digits (max 10).'
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
});

const overviewCurrencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
});

const sectionTicket = document.querySelector('.ticket');
const modalWindow = document.querySelector('.booking-modal');

const typeTicketField = sectionTicket.querySelector('.ticket__filter-group-type');

const modalTicketTypeSelect = modalWindow.querySelector('#ticket-type');

const totalSum = sectionTicket.querySelector('.ticket__sum-number');

const basicInputs = document.querySelectorAll('#basic, #basic-form');
const seniorInputs = document.querySelectorAll('#senior, #senior-form');

const priceModalEntry = modalWindow.querySelectorAll('.form-part-one__entry-price-value');

const overviewDate = modalWindow.querySelector('.form-part-two__data-item--date');
const overviewTime = modalWindow.querySelector('.form-part-two__data-item--time');

const priceModalOverview = modalWindow.querySelectorAll('.form-part-two__price-item');
const typeOverview = modalWindow.querySelector('.form-part-two__data-item--check');

const dateSelect = document.querySelector('#date');
const timeSelect = document.querySelector('#time');

const cardNumberInput = document.querySelector('#card-number');
const cardMonthInput = document.querySelector('#date-card');
const cardYearInput = document.querySelector('#year-card');
const cardNameInput = document.querySelector('#card-name');
const cardCvcInput = document.querySelector('#cvc');

const updateTypeControls = () => {
  if (modalTicketTypeSelect) {
    modalTicketTypeSelect.value = state.type;
  }

  if (typeTicketField) {
    const activeRadio = typeTicketField.querySelector(`input[value="${state.type}"]`);
    if (activeRadio) {
      activeRadio.checked = true;
    }
  }
};

const updateInputPageForm = () => {
  basicInputs.forEach((input) => {
    input.value = state.basicCount;
  });
  seniorInputs.forEach((input) => {
    input.value = state.seniorCount;
  });
};

const updateTicketPrice = () => {
  if (!priceModalEntry.length) {
    return;
  }

  const prices = getCurrentPrices();

  priceModalEntry.forEach((price) => {
    const dataPrice = price.dataset.entryType;
    if (dataPrice !== undefined) {
      price.textContent = currencyFormatter.format(prices[dataPrice]);
    }
  });
};

const updateTotalPrice = () => {
  if (!totalSum) {
    return;
  }

  const totalPrice = calculateTotalSum();

  totalSum.textContent = currencyFormatter.format(totalPrice);
};

const updateTypeOverview = () => {
  if (typeOverview) {
    typeOverview.textContent = TYPE_TITLES[state.type];
  }
};

const updateOverviewRow = (item) => {
  const dataType = item.dataset.type;

  if (!dataType) {
    const totalSumElement = item.querySelector('.form-part-two__total-sum');
    if (totalSumElement) {
      totalSumElement.textContent = overviewCurrencyFormatter.format(calculateTotalSum());
    }
    return;
  }

  const { count, singlePrice, rowSum } = calculateRowSum(dataType);

  const countElement = item.querySelector('.form-part-two__price-count');
  const priceElement = item.querySelector('.form-part-two__price');
  const sumElement = item.querySelector('.form-part-two__price-sum');

  if (countElement) {
    countElement.textContent = count;
  }

  if (priceElement) {
    priceElement.textContent = overviewCurrencyFormatter.format(singlePrice);
  }

  if (sumElement) {
    sumElement.textContent = overviewCurrencyFormatter.format(rowSum);
  }
};

const updateOverviewList = () => {
  if (!priceModalOverview.length) {
    return;
  }

  priceModalOverview.forEach((item) => {
    updateOverviewRow(item);
  });
};

const updateDateTimeOverview = () => {
  if (overviewDate) {
    const selectedOption = dateSelect.options[dateSelect.selectedIndex];
    overviewDate.textContent = selectedOption && dateSelect.value ? selectedOption.textContent : 'Choose date';
  }
  if (overviewTime) {
    overviewTime.textContent = state.time ? state.time : 'Choose time';
  }
};

const updateCardInputs = () => {
  if (cardNumberInput) {
    cardNumberInput.value = state.cardNumber;
  }
  // На Шаге 3 контроллер записал месяц и год в промежуточные свойства стейта
  if (cardMonthInput) {
    cardMonthInput.value = state.cardMonth || '';
  }
  if (cardYearInput) {
    cardYearInput.value = state.cardYear || '';
  }
  if (cardNameInput) {
    cardNameInput.value = state.cardName;
  }
  if (cardCvcInput) {
    cardCvcInput.value = state.cardCvv;
  }
};

const updateInterface = () => {
  updateCardInputs();
  updateTypeOverview();
  updateOverviewList();
  updateTypeControls();
  updateInputPageForm();
  updateTicketPrice();
  updateTotalPrice();
  updateDateTimeOverview();
};

const renderDateSelectOptions = (dateSlots) => {
  if (!dateSelect) {
    return;
  }

  dateSelect.innerHTML = '<option value="" disabled selected>Date</option>';

  dateSlots.forEach((slot) => {
    const option = document.createElement('option');
    option.value = slot.value; // В стейт полетит "2026-05-17"
    option.textContent = slot.text; // Пользователь увидит "Today, May 17"
    dateSelect.appendChild(option);
  });
};

const renderTimeSelectOptions = (timeSlots) => {
  if (!timeSelect) {
    return;
  }

  timeSelect.innerHTML = '<option value="" disabled selected>Time</option>';

  // Если массив пустой (музей уже закрыт сегодня)
  if (timeSlots.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.disabled = true;
    option.textContent = 'Closed for today';
    timeSelect.appendChild(option);
    return;
  }

  timeSlots.forEach((time) => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
};

const showInputError = (inputName, isValid) => {
  const inputElement = document.querySelector(`[name="${inputName}"]`);
  if (!inputElement) {
    return;
  }

  // Ищем, есть ли уже выведенная ошибка рядом с инпутом
  let errorNode = inputElement.parentNode.querySelector('.form-ticket__error-message');

  if (!isValid) {
    inputElement.style.borderColor = '#ff0000';

    // Если сообщения еще нет на экране — создаем его
    if (!errorNode) {
      errorNode = document.createElement('p');
      errorNode.className = 'form-ticket__error-message';
      inputElement.parentNode.appendChild(errorNode);
    }

    errorNode.textContent = ERROR_MESSAGES[inputName];
  } else {
    // Если всё валидно — убираем подсветку и удаляем текст ошибки
    inputElement.style.borderColor = '';
    if (errorNode) {
      errorNode.remove();
    }
  }
};

const clearAllErrors = () => {
  const errorMessages = document.querySelectorAll('.form-ticket__error-message');
  errorMessages.forEach((msg) => msg.remove());

  const inputs = document.querySelectorAll('#form-buy-ticket input, #form-buy-ticket select');
  inputs.forEach((input) => {
    input.style.borderColor = '';
  });
};

export { updateInterface, renderDateSelectOptions, renderTimeSelectOptions, showInputError, clearAllErrors };
