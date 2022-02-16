function validateDate(dateStr) {
  // use regex to test for integers
  const intRegex = /^\d+$/;
  const isValidInt = intRegex.test(dateStr);

  let dateValue = dateStr;

  if (isValidInt) {
    dateValue = parseInt(dateStr); //int;
  }

  const date = new Date(dateValue);
  const milliseconds = date.getTime();
  const isValidDate = !Number.isNaN(milliseconds);

  return {
    isValidDate,
    date: isValidDate ? date : null,
  };
}

module.exports = { validateDate };
