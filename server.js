
var express = require('express');
var app = express();
var path = require('path');
var os = require('os');

var googleSheetsProvider = require('./server/googleSheetsProvider.js');

app.use(function(req, res, next) {
  var allowedOrigins = ["http://localhost:3000"];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get('/api/funds/scholarships', (req, res) => {

  var isLocalHost = req.headers.host.toLowerCase().indexOf('localhost') >= 0;

  var sheetProvider = new googleSheetsProvider("1bZPAHpFqFyiEykCHXn6ftS0KI2ErspPbMKNdREOrhuI");

  sheetProvider.getRowsForRange("Scholarships!A1:J1000", function(response) {
    res.end(JSON.stringify(response));
  }, function(err) {
    res.status(401).end("funds fetch fail!: " + err);
    console.info(err);
  });
});

app.get('/api/funds/legalaid', (req, res) => {

  var isLocalHost = req.headers.host.toLowerCase().indexOf('localhost') >= 0;

  var sheetProvider = new googleSheetsProvider("1bZPAHpFqFyiEykCHXn6ftS0KI2ErspPbMKNdREOrhuI");

  sheetProvider.getRowsForRange("Legal Aid!A2:J1000", function(response) {
    res.end(JSON.stringify(response));
  }, function(err) {
    res.status(401).end("funds fetch fail!: " + err);
    console.info(err);
  });
});

app.get('/api/funds/health', (req, res) => {

  var isLocalHost = req.headers.host.toLowerCase().indexOf('localhost') >= 0;

  var sheetProvider = new googleSheetsProvider("1bZPAHpFqFyiEykCHXn6ftS0KI2ErspPbMKNdREOrhuI");

  sheetProvider.getRowsForRange("Healthcare Resources!A1:J1000", function(response) {
    res.end(JSON.stringify(response));
  }, function(err) {
    res.status(401).end("funds fetch fail!: " + err);
    console.info(err);
  });
});



var indexFolder = path.join(__dirname, 'build');
//generals
app.use(express.static(indexFolder));


app.get('/*', function (req, res) {
   res.sendFile(path.join(indexFolder, 'index.html'));
});


const port = process.env.PORT || 4000;

//start the servers
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});


