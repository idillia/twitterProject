var moment = require('moment');
var fs = require('fs');

var aviodWordsInName = ["inc", "co", "llp", "lllp", "llc", "pllc", "lab", "labs", "corp", "ltd", "gmbh", "dba", "lc", "company", "pc", "p\.c\."];
var aviodWordsInBio = ["adult only", "+18", "xxx", "erotic", "porn", "erotica", "pussy", "cock"];

exports.sanName = function(noWords) {
  var regexArray = [];
  for (var i =0; i<noWords.length; i++) {
    regexArray.push(new RegExp('\\b' + noWords[i] + '\\b', 'gi'));
  }
  return regexArray;
}(aviodWordsInName);

exports.sanBio = function(noWords) {
  var regexArray = [];
  for (var i =0; i<noWords.length; i++) {
    if (noWords[i] == "+18") {
      regexArray.push(new RegExp('\\+18', 'gi'));
    }
    else {
      regexArray.push(new RegExp('\\b' + noWords[i] + '\\b', 'gi'));
    }
  }
  return regexArray;
}(aviodWordsInBio);

exports.fithteenDaysBeforeArray = function() {
  var fithteenDaysArr = [];
  var today = moment().format('L');
  for (var i=0; i<15; i++) {
    var subtractDays = moment().subtract(i,"days").format('L');
    fithteenDaysArr.push(subtractDays);
  }
  return fithteenDaysArr;
};

exports.formatTweetDates = function(unformatedDates) {
  var formatedTweetDatesArr = [];
  for (var i=0; i<unformatedDates.length; i++) {
    var formatDates = moment(unformatedDates[i], "ddd MMM DD HH:mm:ss Z YYYY").format('L');
    formatedTweetDatesArr.push(formatDates);
  }
  return formatedTweetDatesArr;
};

exports.getBiggerPhotoLink = function(item){
  return item.replace(/_normal/, '_bigger')
};


