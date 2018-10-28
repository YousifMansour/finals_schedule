var S = require('string');

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

let containsWeekDay = function(input) {
  for (let day of WEEK_DAYS) {
    if (input.includes(day)) return true;
  }
  return false;
};

// returns day contained in input. call if input is a weekday
let getWeekDayFromLine = function(input) {
  if (input.includes('Monday')) return 'Monday';
  if (input.includes('Tuesday')) return 'Tuesday';
  if (input.includes('Wednesday')) return 'Wednesday';
  if (input.includes('Thursday')) return 'Thursday';
  if (input.includes('Friday')) return 'Friday';
  if (input.includes('Saturday')) return 'Saturday';
  if (input.includes('Sunday')) return 'Sunday';
};

let getBuilding =
    function(input) {
  for (let building of AUB_BUILDINGS) {
    if (S(input).contains(building)) return building;
  }

  return null;
}

// get month
let getMonth =
    function() {
  let month = new Date().getMonth();
  switch (month) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'Febuary';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }
  return month;
}

let month = 'July';
let year = new Date().getFullYear();

module.exports = {
  WEEK_DAYS: WEEK_DAYS,
  AUB_BUILDINGS: AUB_BUILDINGS,
  containsWeekDay: containsWeekDay,
  containsWeekDay: containsWeekDay,
  getBuilding: getBuilding,
  getMonth: getMonth,
  getWeekDayFromLine: getWeekDayFromLine,
  month: month,
  year: year
};