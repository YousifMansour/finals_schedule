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

let MAX_ROWS = 57;

let PDFParser = require('pdf2json');

let pdfParser = new PDFParser(this, 1);

let finals = '';
let pageSeparator = 'Fall 2017-18Final Exam by Date Timepage 2/22\r';

let parsedJson = [];

let isWeekDay = function(input) {
  if (S(input).contains('Sunday') || S(input).contains('Monday') ||
      S(input).contains('Tuesday') || S(input).contains('Wednesday') ||
      S(input).contains('Thursday') || S(input).contains('Friday') ||
      S(input).contains('Saturday'))
    return true;
  else
    return false;
};

let containedWeekDay = function(input) {
  if (S(input).contains('Monday')) return 'Monday';
  if (S(input).contains('Tuesday')) return 'Tuesday';
  if (S(input).contains('Wednesday')) return 'Wednesday';
  if (S(input).contains('Thursday')) return 'Thursday';
  if (S(input).contains('Friday')) return 'Friday';
  if (S(input).contains('Saturday')) return 'Saturday';
  if (S(input).contains('Sunday')) return 'Sunday';
};

// helpder functions

let pageNumber = 2;
let rowNumber = -1;

pdfParser.on(
    'pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
  finals = (pdfParser.getRawTextContent()).split('CourseRoomDateTime');

  finals.splice(0, 1);

  // for (let i = 1; i < finals.length; i++) {
  //   finals[i] = finals[i] + '//' + (Number(i) + 1);
  // }

  finals = finals.join();
  finals = finals.split(pageSeparator);

  finals = finals.join();
  finals = finals.split('\n');
  // parser

  parse(finals);
});

let isAUBbuilding = function(input) {
  return (
      S(input).toUpperCase().contains('BLISS') ||
      S(input).toUpperCase().contains('NICELY') ||
      S(input).toUpperCase().contains('FISK') ||
      S(input).toUpperCase().contains('WHCR') ||
      S(input).toUpperCase().contains('IOEC') ||
      S(input).toUpperCase().contains('NABIL') ||
      S(input).toUpperCase().contains('LAB') ||
      S(input).toUpperCase().contains('CHEMISTRY') ||
      S(input).toUpperCase().contains('OSB') ||
      S(input).toUpperCase().contains('AGRICULTURE') ||
      S(input).toUpperCase().contains('BECHTA') ||
      S(input).toUpperCase().contains('BIOLOGY') ||
      S(input).toUpperCase().contains('SLH') ||
      S(input).toUpperCase().contains('PHYSICS') ||
      S(input).toUpperCase().contains('SRB') ||
      S(input).toUpperCase().contains('POST') ||
      S(input).toUpperCase().contains('SML') ||
      S(input).toUpperCase().contains('FEA') ||
      S(input).toUpperCase().contains('HSON') ||
      S(input).toUpperCase().contains('VAN') ||
      S(input).toUpperCase().contains('BLISS'));
};

let parseOneLine =
    function(line) {
  // var line = finals[1];
  line = line.split('//');
  // let tempPageNumber = line[1];
  // if (tempPageNumber != undefined) {
  //   pageNumber = tempPageNumber.replace(',', '');
  //   console.log(pageNumber);
  //   rowNumber = 0;
  // } else
  //   rowNumber++;
  if (rowNumber == MAX_ROWS) {
    pageNumber++;
    rowNumber = -1;
  } else
    rowNumber++;
  line = line[0];
  line = S(line).strip(',');  // strip
  line = S(line).replaceAll('/', ' ');
  line = line.split(' ');

  if (line == undefined || line == '') return;
  // console.log('line : ' + line);
  var courseName = line[0];
  if (!S(courseName).isUpper()) return;
  // console.log('courseName: ' + courseName);
  var courseNumber = line[1];
  if (S(courseNumber).isAlphaNumeric()) {
    if (!S(courseNumber).isNumeric()) {
      var secondPart = S(courseNumber).right(courseNumber.length - 3);
      if (isAUBbuilding(secondPart)) {
        courseNumber = S(courseNumber).left(3);
        line.splice(1, 0, secondPart);
      }
    }
    // console.log('courseNumber: ' + courseNumber);
    if (line[2] == '-') {
      var sectionAndRoom = line[3];
      // console.log('sectionAndRoom: ' + sectionAndRoom);
      var section = sectionAndRoom[0];
      let j = 1;  // inedx of section number
      while (!isNaN(sectionAndRoom[j])) {
        section = section + sectionAndRoom[j];
        j++;
      }
      var roomName = S(sectionAndRoom).right(sectionAndRoom.length - j).s;
      // console.log('section: ' + section);

      let i = 4;

      if (isWeekDay(roomName)) {
        var weekDayWithRoom = roomName;
        var weekDay = containedWeekDay(weekDayWithRoom);

        if (weekDay.length < weekDayWithRoom.length) {
          var firstPart = S(weekDayWithRoom)
                              .left(weekDayWithRoom.length - weekDay.length)
                              .s;
          roomName = firstPart;
          i = 3;
        }
      } else {
        var roomNumber = [];
        // var i = 4;
        while (!isWeekDay(line[i]) && line[i] != undefined) {
          if (!isNaN(line[i])) {
            roomNumber.push(line[i]);
          }
          i++;
        }

        var weekDayWithRoom = line[i];
        var weekDay = containedWeekDay(weekDayWithRoom);
        if (weekDay.length < weekDayWithRoom.length) {
          var firstPart = S(weekDayWithRoom)
                              .left(weekDayWithRoom.length - weekDay.length)
                              .s;
          roomNumber.push(firstPart);
        }
      }

      // console.log('roomName: ' + roomName);
      // console.log('roomNumber: ' + roomNumber);
      // console.log('weekDay: ' + weekDay);
      i++;
      // if weekDay contains extra letters trim them and or add to room
      // number
      var monthName = line[i];
      // console.log('monthName: ' + monthName);
      i++;
      var monthNumber = line[i];
      // console.log('monthNumber: ' + monthNumber);
      i++;
      var yearAndTime = line[i];
      i++;
      // console.log('yearandtime ' + yearAndTime);

      var year = S(yearAndTime).left(4).s;
      if (yearAndTime.length > 4)
        var time = S(yearAndTime).right(yearAndTime.length - 4).s;
      else {
        var time = line[i];
        i++;
      }

      // console.log('year: ' + year);
      // console.log('time: ' + time);

      var amPm = S(line[i]).left(2).s;

      // console.log('amPm: ' + amPm);
      // add to data

      if (roomNumber != undefined) {
        for (let i = 0; i < roomNumber.length; i++) {
          if (S(roomNumber[i]).isAlpha()) {
            roomName = roomName + ' ' + roomNumber[i];
            roomNumber.splice(i, 1);
          }
        }
      }

      parsedJson.push({
        'fullLine': line,
        'pageNumber': pageNumber,
        'rowNumber': rowNumber,
        'courseName': courseName,
        'courseNumber': courseNumber,
        'section': section,
        'roomName': roomName,
        'roomNumber': roomNumber,
        'weekDay': weekDay,
        'monthName': monthName,
        'monthNumber': monthNumber,
        'year': year,
        'time': time,
        'amPm': amPm
      });

    } else {
      var roomName = line[2];
      var i = 3;
      if (isAUBbuilding(roomName) && S(roomName).isAlphaNumeric()) {
        courseNumber = S(roomName).left(3);
        roomName = S(roomName).right(roomName.length - 3);
      }

      var roomNumber = [];

      while (!isWeekDay(line[i])) {
        roomNumber.push(line[i]);
        i++;
      }
      // console.log('roomNumber: ' + roomNumber);
      var weekDay = line[i];
      weekDay = containedWeekDay(weekDay);
      // console.log('weekDay: ' + weekDay);
      i++;
      // if weekDay contains extra letters trim them and or add to room
      // number
      var monthName = line[i];
      // console.log('monthName: ' + monthName);
      i++;
      var monthNumber = line[i];
      // console.log('monthNumber: ' + monthNumber);
      i++;
      var yearAndTime = line[i];
      // console.log('yearandtime ' + yearAndTime);
      i++;
      var year = S(yearAndTime).left(4).s;
      if (yearAndTime.length > 4)
        var time = S(yearAndTime).right(yearAndTime.length - 4).s;
      else {
        var time = line[i];
        i++;
      }
      // console.log('year: ' + year);
      // console.log('time: ' + time);
      var amPm = S(line[i]).left(2).s;
      // console.log('amPm: ' + amPm);

      if (roomNumber != undefined) {
        for (let i = 0; i < roomNumber.length; i++) {
          if (S(roomNumber[i]).isAlpha()) {
            roomName = roomName + ' ' + roomNumber[i];
            roomNumber.splice(i, 1);
          }
        }
      }

      parsedJson.push({
        'fullLine': line,
        'pageNumber': pageNumber,
        'rowNumber': rowNumber,
        'courseName': courseName,
        'courseNumber': courseNumber.toString(),
        'section': section,
        'roomName': roomName.toString(),
        'roomNumber': roomNumber,
        'weekDay': weekDay,
        'monthName': monthName,
        'monthNumber': monthNumber,
        'year': year,
        'time': time,
        'amPm': amPm
      });
    }
  };
}

let parse = function(lineArray) {
  for (let line of lineArray) {
    parseOneLine(line);
  }
};

pdfParser.loadPDF('./finals.pdf');

app.get('/api/getData', function(req, res) {
  // res.send('ok');
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