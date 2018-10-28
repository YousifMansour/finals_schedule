var S = require('string');
var helperFunctions = require('./helper-functions');

let month = helperFunctions.month;
let year = helperFunctions.year;

let rowPerPage = 48;
let row = 0;
let page = 2;

let parseOneLine = (line, parsedJson) => {
  // remove day from line
  if (helperFunctions.containsWeekDay(line)) {
    line = line.split(helperFunctions.getWeekDayFromLine(line));
    line = line[0] + line[1];
  }

  if (row == rowPerPage) {
    row = 0;
    page++;
  }

  row++;
  original = line;

  line = line.split(month);

  let dateAndTime = line[1];

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

  building = helperFunctions.getBuilding(line);

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
};

module.exports = parseOneLine;