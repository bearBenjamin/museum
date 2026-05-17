const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric'
});

const getTodayISODate = () => new Date().toISOString().split('T')[0];

const isToday = (dateString) => {
  if (!dateString) {
    return false;
  }

  return dateString === getTodayISODate();
};

const generateDateSlots = (daysCount = 7) => {
  const slots = [];

  for (let i = 0; i < daysCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const rawValue = date.toISOString().split('T')[0];
    const formattedText = dateFormatter.format(date);

    slots.push({ value: rawValue, text: formattedText });
  }
  return slots;
};

const isSelectedDateToday = (selectedRawDate) => {
  const todayRaw = new Date().toISOString().split('T')[0];
  return selectedRawDate === todayRaw;
};

const generateTimeSlots = (selectedRawDate) => {
  const slots = [];
  const START_HOUR = 9;
  const END_HOUR = 18;
  const STEP = 30;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const checkTimeRestriction = isToday(selectedRawDate);

  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += STEP) {
      if (hour === END_HOUR && minute > 0) {
        break;
      }

      if (checkTimeRestriction) {
        if (hour < currentHour) {
          continue;
        }

        if (hour === currentHour && minute <= currentMinute) {
          continue;
        }
      }

      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

const maskCardNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const maskCardMonth = (value) => {
  let digits = value.replace(/\D/g, '').slice(0, 2);
  if (digits.length === 1 && digits > 1) {
    digits = `0${digits}`;
  }
  return digits;
};

const maskCardYear = (value) => value.replace(/\D/g, '').slice(0, 4);
const maskCardCvc = (value) => value.replace(/\D/g, '').slice(0, 3);
const maskCardName = (value) => value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();

/**
 * Валидация имени: от 3 до 15 символов, только русские/английские буквы и пробелы
 */
const validateUserName = (name) => {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]{3,15}$/;
  return nameRegex.test(name);
};

/**
 * Валидация e-mail по ТЗ:
 * username (3-15 симв: буквы, цифры, _, -) + @ + domain (мин. 4 лат. буквы) + . + top-domain (мин. 2 лат. буквы)
 */
const validateUserEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Валидация телефона по ТЗ:
 * Очищенный от пробелов и дефисов номер должен состоять строго из цифр (не более 10 штук).
 * Разрешаем пустую строку, если поле необязательное, либо проверяем структуру.
 */
const validateUserPhone = (phone) => {
  if (!phone) {
    return false;
  }

  // Проверяем допустимые символы (цифры, пробелы, дефисы)
  const allowedCharsRegex = /^[0-9\s-]+$/;
  if (!allowedCharsRegex.test(phone)) {
    return false;
  }

  // Считаем чистое количество цифр
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length > 0 && digitsOnly.length <= 10;
};

/**
 * Валидация номера карты: после удаления пробелов должно быть ровно 16 цифр
 */
const validateCardNumber = (value) => value.replace(/\D/g, '').length === 16;

/**
 * Валидация месяца: ровно 2 цифры
 */
const validateCardMonth = (value) => value.length === 2;

/**
 * Валидация года: ровно 4 цифры
 */
const validateCardYearField = (value) => value.length === 4;

/**
 * Валидация CVC: ровно 3 цифры
 */
const validateCardCvcField = (value) => value.length === 3;

/**
 * Валидация имени: поле не должно быть пустым (хотя бы 2 символа)
 */
const validateCardNameField = (value) => value.trim().length >= 2;

export { generateDateSlots, isSelectedDateToday, generateTimeSlots, maskCardNumber, maskCardMonth, maskCardYear, maskCardCvc, maskCardName, validateUserName, validateUserEmail, validateUserPhone, validateCardNumber, validateCardMonth, validateCardYearField, validateCardCvcField, validateCardNameField };
