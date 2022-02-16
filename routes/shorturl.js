const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const ShortUrl = require('../models/ShortUrl');
const dns = require('dns');

router.get('/:shorturl', async (req, res) => {
  try {
    const { shorturl } = req.params;
    console.log({ shorturl });
    const result = await ShortUrl.findOne({ short_url: shorturl });

    if (!result) {
      return res.status(400).send({ error: 'invalid url' });
    }

    return res.redirect(result.original_url);
  } catch (error) {
    next('error...');
  }
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const { url } = req.body;
    console.log({ url });
    const regex =
      /^(http:\/\/|https:\/\/)(www.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    const isValidUrl = regex.test(url);

    if (!isValidUrl) {
      return res.status(400).json({ error: 'invalid url' });
    }

    const validDns = await new Promise((resolve, rej) => {
      dns.lookup(url, (err, address) => {
        if (err) {
          resolve(false);
        }

        resolve(true);
      });
    });

    if (!validDns) {
      return res.status(400).json({ error: 'invalid url' });
    }

    const existingUrl = await ShortUrl.findOne(
      {
        original_url: url,
      },
      {
        original_url: 1,
        short_url: 1,
      }
    );

    const baseUrl =
      'https://freecodecamp-timestamp-project.herokuapp.com/api/shorturl/';

    if (existingUrl) {
      return res.status(200).json({
        original_url: existingUrl.original_url,
        short_url: existingUrl.short_url,
      });
    }

    const result = await ShortUrl.create({ original_url: url });

    return res.status(200).json({
      original_url: result.original_url,
      short_url: result.short_url,
    });
  } catch (error) {
    console.log(error);
    next('something went wrong...');
  }
});

module.exports = router;
