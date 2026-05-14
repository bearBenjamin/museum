const TICKET__PRICE = {
  permanent: 20,
  temporary: 25,
  combined: 40
};

const SENIOR__PRICE__COEFFICENT = 0.5;

const state = {
  type: 'permanent',
  basicCount: 1,
  seniorCount: 1,
  date: '',
  time: ''
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0, // Убираем центы (.00), если они не нужны в макете
});

const sectionTicket = document.querySelector('.ticket');

const typeTicketField = sectionTicket.querySelector('.ticket__filter-group-type');
const amountTicketField = sectionTicket.querySelector('.ticket__filter-group-amount');

const countTicketBasic = sectionTicket.querySelector('#basic');
const countTicketSenior = sectionTicket.querySelector('#senior');
const totalSum = sectionTicket.querySelector('.ticket__sum-number');

const updateInterface = () => {
  if (!countTicketBasic || !countTicketSenior || !totalSum) {
    return;
  }

  countTicketBasic.value = state.basicCount;
  countTicketSenior.value = state.seniorCount;

  const ticketBasicPrice = TICKET__PRICE[state.type] * state.basicCount;
  const ticketSeniorPrice = TICKET__PRICE[state.type] * state.seniorCount * SENIOR__PRICE__COEFFICENT;
  const totalPrice = ticketBasicPrice + ticketSeniorPrice;

  totalSum.textContent = currencyFormatter.format(totalPrice);
};

const getTypeTicket = (evt) => {
  if (evt.target.type === 'radio') {
    const value = evt.target.value;
    state.type = value;
    updateInterface();
  }
};

const getQuantityTicket = (evt) => {
  evt.preventDefault();

  const btn = evt.target.closest('.ticket__decrease, .ticket__increase');

  if (!btn) {
    return;
  }

  const delta = btn.classList.contains('ticket__decrease') ? -1 : 1;
  const container = btn.closest('[data-type]');

  if (!container) {
    return;
  }

  const key = container.dataset.type;
  state[key] = Math.max(0, (state[key] || 0) + delta);

  updateInterface();
};

typeTicketField.addEventListener('change', getTypeTicket);
amountTicketField.addEventListener('click', getQuantityTicket);

updateInterface();
