var express = require('express');
var router = express.Router({mergeParams: true});
var S = require('string');
var parse = require('./parse');

let PDFParser = require('pdf2json');
let pdfParser = new PDFParser(this, 1);

let parsedJson = [];

pdfParser.on(
    'pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
  rawText = pdfParser.getRawTextContent().split('\n');
  examText = [];

  for (var i = 0; i < rawText.length; i++) {
    if (!S(rawText[i]).contains('---') && !S(rawText[i]).contains('by Date') &&
        !S(rawText[i]).contains('Room')) {
      examText.push(rawText[i]);
    }
  }
  parse(examText, parsedJson);
});

pdfParser.loadPDF('./finals.pdf');

//////////////////////
// ROUTES
//////////////////////
router.get('/getData', (req, res) => {
  res.json(parsedJson);
  res.end();
});

router.get('/:courseName/:courseNumber/', (req, res) => {
  var courseName = req.params.courseName;
  var courseNumber = req.params.courseNumber;

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

router.get('/:courseName/:courseNumber/:section/', (req, res) => {
  var courseName = req.params.courseName;
  var courseNumber = req.params.courseNumber;
  var section = req.params.section;
  for (let line of parsedJson) {
    if (line.courseName == courseName && line.courseNumber == courseNumber &&
        line.section == section) {
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

module.exports = router;