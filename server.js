// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const apiRouter = require('./routes/');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// setup router
app.use('/api', apiRouter);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, async function () {
  console.log('Your app is listening on port ' + listener.address().port);

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connection to database ${db.connection.name} successful!`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
