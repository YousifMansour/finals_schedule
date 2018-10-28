var S = require('string');
var parseOneLine = require('./parse-one-line.js');
let parse = function(finals, parsedJson) {
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
    parseOneLine(line, parsedJson);
  }
  // console.log(parsedJson);
};

module.exports = parse;