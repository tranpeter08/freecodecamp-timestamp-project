const router = require('express').Router();

router.get('/', (req, res) => {
  const ipaddress = req.ip;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  return res.status(200).json({
    ipaddress,
    language,
    software,
  });
});

module.exports = router;
