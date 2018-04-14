let fs = require('fs');
let express = require('express');

var path = require('path');
var bodyParser = require('body-parser');

var S = require('string');

var app = express()
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader(
      'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader(
      'Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

let PDFParser = require('pdf2json');

let pdfParser = new PDFParser(this, 1);

let finals = '';

let parsedJson = [];

let pageCount = 0;
let rowPerPage = 48;
let row = 0;
let page = 2;

WEEK_DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

AUB_BUILDINGS = [
  'BLISS',
  'NICELY',
  'FISK',
  'WHCR',
  'CHEM',
  'IOEC',
  'Nabil Boustani Auditorium',
  'LAB',
  'OSB',
  'CHEMISTRY',
  'OSB',
  'AGRICULTURE',
  'BECHTA',
  'BIOLOGY',
  'SLH',
  'PHYYICS',
  'BECHTA',
  'Van Dyck Computer Lab',
  'SRB',
  'POST',
  'SML',
  'FEA',
  'HSON Computer Lab',
  'HSON Auditorium',
  'VAN',
  'VANDLAB',
  'PHYS',
  'bliss',
  'Van Dyck'
];

let isWeekDay = function(input) {
  return (S(input).contains(WEEK_DAYS))
};

// returns day contained in input. call if input is a weekday
let containedWeekDay = function(input) {
  if (S(input).contains('Monday')) return 'Monday';
  if (S(input).contains('Tuesday')) return 'Tuesday';
  if (S(input).contains('Wednesday')) return 'Wednesday';
  if (S(input).contains('Thursday')) return 'Thursday';
  if (S(input).contains('Friday')) return 'Friday';
  if (S(input).contains('Saturday')) return 'Saturday';
  if (S(input).contains('Sunday')) return 'Sunday';
};

pdfParser.on(
    'pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
  // call parse() on lines or change parse

  // prepare array of lines which contain only exams
  // parse each line to have it in parsedJson
  // profit
  rawText = pdfParser.getRawTextContent().split('\n');
  examText = [];

  for (var i = 0; i < rawText.length; i++) {
    if (S(rawText[i]).contains('Exam ')) pageCount++;

    if (!S(rawText[i]).contains('---') && !S(rawText[i]).contains('by Date') &&
        !S(rawText[i]).contains('RoomDate')) {
      examText.push(rawText[i]);
    }
  }

  parse(examText);
});

let getBuilding =
    function(input) {
  for (let building of AUB_BUILDINGS) {
    if (S(input).contains(building)) return building;
  }

  return null;
}

let parseOneLine =
    function(line) {
  if (row == rowPerPage) {
    row = 0;
    page++;
  }

  row++;

  original = line;

  line = line.split('May');

  dateAndTime = line[1];


  month = 'May';
  year = '2018';
  dateAndTime = dateAndTime.replace('\r', '').split('2018');
  day = dateAndTime.shift().replace(',', '').replace(/ /g, '');

  dateAndTime = dateAndTime.join().split(' ');

  time = dateAndTime[0];
  if (time.length == 4) time = '0' + time;
  amPm = dateAndTime[1];

  line = line[0];

  line = S(line).split(' ');

  courseName = line.shift().replace(' ', '').replace(',', '').replace('-', '');
  if (S(original).contains('-'))
    courseNumber = line.shift();
  else {
    courseNumber = line[0].replace(/[a-z]/g, '').replace(/[A-Z]/g, '');
    line[0] = line[0].replace(/[0-9]/g, '');
  }

  original = line;

  line = line.join(' ');


  building = getBuilding(line);

  section = '';
  roomNumber = '';

  if (building != null) {
    line = line.split(building);
    if (line.length > 1) {
      roomNumber = line.pop()
                       .replace(' ', '')
                       .replace(',', '')
                       .replace('-', '')
                       .replace(',,', ', ')
                       .replace('&', '');

      line = S(line[0]).split(' ');

      section = line[line.length - 1].replace(' ', '').replace(',', '').replace(
          '-', '');
    }
  } else
    building = null;

  parsedJson.push({
    'fullLine': original,
    'pageNumber': page,
    'rowNumber': row,
    'courseName': courseName,
    'courseNumber': courseNumber,
    'section': section,
    'roomName': building,
    'roomNumber': roomNumber,
    'weekDay': day,
    'monthName': month,
    'monthNumber': day,
    'year': year,
    'time': time,
    'amPm': amPm
  });
}

let parse = function(finals) {
  startingIndex = 0;
  for (var i = 0; i < finals.length; i++) {
    if (S(finals[i]).contains('Final Examinations Schedule')) {
      startingIndex = i + 1;
      break;
    }
  }

  for (var i = 0; i < startingIndex; i++) {
    finals.shift();
  }
  finals.pop();
  // now finals only has lines each corresponding to a final exam info.

  for (let line of finals) {
    parseOneLine(line);
  }
};

// preparing JSON
pdfParser.loadPDF('./finals.pdf');

// JSON TEMPLATE



// server stuff
app.get('/api/getData', function(req, res) {
  res.json(parsedJson);
  res.end();
});

app.get('/api/getRaw', function(req, res) {
  res.send(finals);
  res.end();
});

app.get('/api/:courseName/:courseNumber/getFinal', function(req, res) {
  var courseName = req.params.courseName.replace(':', '');
  var courseNumber = req.params.courseNumber.replace(':', '');
  var array = [];
  for (let line of parsedJson) {
    if (line.courseName == courseName && line.courseNumber == courseNumber) {
      array.push(line);
    }
  }

  if (array.length == 0) {
    console.log('status 404');
    res.status(404);
    res.send(
        courseName + ' ' + courseNumber + ' ' +
        'not found');
  } else
    res.send(array);
  res.end();
});

app.get(
    '/api/:courseName/:courseNumber/:section/getFinalBySection',
    function(req, res) {
      var courseName = req.params.courseName.replace(':', '');
      var courseNumber = req.params.courseNumber.replace(':', '');
      var section = req.params.section.replace(':', '');
      for (let line of parsedJson) {
        if (line.courseName == courseName &&
            line.courseNumber == courseNumber && line.section == section) {
          res.send(line);
          res.end();
          return;
        }
      }
      console.log('status 404');
      res.status(404);
      res.send(
          courseName + ' ' + courseNumber + ' ' +
          'not found');
      res.end();
    });

app.listen(8080, function() {
  console.log('listening on port 8080!');
});
