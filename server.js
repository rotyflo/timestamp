// server.js
// where your node app starts

// npm install dotenv --save
// create .env file with environment variables
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const req = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let unixTime = new Date(req.params.date);
  let utcTime;
  if (unixTime != 'Invalid Date') {
    unixTime = Date.parse(unixTime);
    utcTime = new Date(unixTime);
    res.json({
      unix: unixTime,
      utc: utcTime.toUTCString()
    }); 
  }
  else if (/[0-9]{13}/.test(req.params.date)) {
    unixTime = parseInt(req.params.date);
    utcTime = new Date(unixTime);
    res.json({
      unix: unixTime,
      utc: utcTime.toUTCString()
    }); 
  }
  if (!req.params.date) {
    let currentDate = new Date();
    res.json({
      unix: Date.now(),
      utc: currentDate.toUTCString()
    })
  }
  
  res.json({error: 'Invalid Date'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
