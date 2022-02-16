const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('upfile'), async (req, res, next) => {
  try {
    console.log(req.file);
    const { originalname, mimetype, size } = req.file;
    res.json({
      name: originalname,
      type: mimetype,
      size,
    });
  } catch (error) {
    console.log(error);
    next('something went wrong...');
  }
});

module.exports = router;
