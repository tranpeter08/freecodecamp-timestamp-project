const router = require('express').Router();
const whoamiRouter = require('./whoami');
const shorturlRouter = require('./shorturl');
const usersRouter = require('./users');
const { validateDate } = require('../utils/validators');

router.use('/shorturl', shorturlRouter);
router.use('/whoami', whoamiRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  const date = new Date();

  const unix = date.getTime();
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

  const unix = dateObj.getTime();
  const utc = dateObj.toUTCString();

  res.send({ unix, utc });
});

module.exports = router;
