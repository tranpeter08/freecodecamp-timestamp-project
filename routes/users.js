const router = require('express').Router();
const multer = require('multer');
const User = require('../models/User');
const upload = multer();
const Exercise = require('../models/Exercise');

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.find({}, { _id: 1, username: 1 });
    return res.json(users);
  } catch (error) {
    next('error...');
  }
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const { username } = req.body;

    console.log({ username });

    const existingUser = await User.findOne(
      { username },
      { _id: 1, username: 1 }
    );

    if (existingUser) {
      return res.json(existingUser);
    }

    const newUser = await User.create({ username });

    return res.json({ _id: newUser._id, username: newUser.username });
  } catch (error) {
    console.log(error);
    next('something went wrong...');
  }
});

router.post('/:_id/exercises', upload.none(), async (req, res, next) => {
  try {
    const { description, duration, date } = req.body;

    const { _id } = req.params;
    const existingUser = await User.findById(_id);

    console.log(req.body);
    console.log({ existingUser });

    if (!existingUser) {
      res.json({ error: 'user not found' });
    }

    const payload = { description, duration };

    if (date) {
      payload.date = date;
    }

    const result = await Exercise.create({
      user_id: _id,
      ...payload,
    });

    console.log({ result });

    res.json({
      username: existingUser.username,
      _id: result._id,
      description: result.description,
      duration: result.duration,
      date: new Date(result.date).toDateString(),
    });
  } catch (error) {
    console.log(error.message);
    next('ERROR');
  }
});

router.get('/:_id/logs', async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = await User.findById(_id);

    if (!user) {
      res.json({ error: ' no user' });
    }

    const options = {};

    const query = {
      user_id: _id,
    };

    if (from || to) {
      if (from) {
        options.$gte = from;
      }

      if (to) {
        options.$lte = to;
      }

      query.date = options;
    }

    const fields = { user_id: 0, _id: 0, __v: 0 };

    const exercises = await Exercise.find(query, fields).limit(limit).lean();
    console.log({ exercises });

    for (const exercise of exercises) {
      exercise.date = new Date(exercise.date).toDateString();
    }

    res.json({
      username: user.username,
      _id,
      count: exercises.length,
      log: exercises,
    });
  } catch (error) {
    console.log(error);
    next('error');
  }
});

module.exports = router;
