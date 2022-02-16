const router = require('express').Router();
const { validateDate } = require('../utils/validators');

router.get('/', (req, res) => {
  const date = new Date();

  const unix = Math.floor(date.getTime() / 1000);
  const utc = date.toUTCString();

  return res.status(200).json({
    unix,
    utc,
  });
});

router.get('/:date', (req, res) => {
  const { date } = req.params;
  const { isValidDate, date: dateObj } = validateDate(date);

  // check if valid date, if not send error message
  if (!isValidDate) {
    return res.status(400).send({ error: 'Invalid Date' });
  }

  const unix = Math.floor(dateObj.getTime() / 1000);
  const utc = dateObj.toUTCString();

  res.send({ unix, utc });
});

module.exports = router;
