const TICKET__PRICE = {
  permanent: 20,
  temporary: 25,
  combined: 40
};

const SENIOR__PRICE__COEFFICENT = 0.5;

const TYPE_TO_PRICE_KEY = {
  basicCount: 'basic',
  seniorCount: 'senior',
};

const state = {
  type: 'permanent',
  basicCount: 1,
  seniorCount: 1,
  date: '',
  time: '',
  name: '',
  mail: '',
  phone: '',
  cardNumber: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  cardName: ''
};

const getCurrentPrices = () => {
  const basePrice = TICKET__PRICE[state.type];
  return {
    basic: basePrice,
    senior: basePrice * SENIOR__PRICE__COEFFICENT
  };
};

const getSingleTicketPrice = (dataType) => {
  const prices = getCurrentPrices();
  const priceKey = TYPE_TO_PRICE_KEY[dataType];
  return prices[priceKey] || 0;
};

const calculateTotalSum = () => {
  const prices = getCurrentPrices();
  return (prices.basic * state.basicCount) + (prices.senior * state.seniorCount);
};

const changeTicketType = (newType) => {
  state.type = newType;
};

const getTicketCount = (dataType) => state[dataType] || 0;

const calculateRowSum = (dataType) => {
  const count = getTicketCount(dataType);
  const singlePrice = getSingleTicketPrice(dataType);

  return {
    count,
    singlePrice,
    rowSum: singlePrice * count
  };
};

const changeTicketQuantity = (key, delta) => {
  if (state[key] !== undefined) {
    state[key] = Math.max(0, state[key] + delta);
  }
};

const updateUserData = (key, value) => {
  if (state[key] !== undefined) {
    state[key] = value;
  }
};

export { state , getCurrentPrices, calculateRowSum, calculateTotalSum, changeTicketType, changeTicketQuantity, updateUserData };
