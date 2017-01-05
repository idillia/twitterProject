var _ = require('underscore');

var json = require("./json/test.json");
var fs = require('fs');
var webshot = require('webshot');

var options = {
  renderDelay: 30000,
  screenSize: {
    width: 500,     
    height: 485
  },
  shotSize: {
    width: 500,
    height: 485
  }
}
console.log("size: ", json.users.length)

var size = json.users.length;
// var size = 15;
var additionBy = 5;
var min = 0;
var max = 5;
var interval;

interval = setInterval(function() {
  var screenshot = function(users){
    for (var j = min; j < max; j++) {
      console.log("user :" j, users.users[j].screen_name)
      // users.users[j].screenshot_path = 'images/screenshots/' + users.users[j].screen_name + '.png';

      webshot('http://localhost:3000/screenshot/' + users.users[j].screen_name, 'images/screenshots/' + users.users[j].screen_name + '.png', options, function(err) {
        // screenshot now saved to google.png
      });
      if(max == size) {
        clearInterval(interval);
      }

    }
    if(max < size) {    
      min = max;
      max +=additionBy; 
      if(max >= size) {
        max = (size % additionBy) + Math.floor(size/additionBy)*additionBy;
      }
    } 
    
    return users;
  }(json)


}, 1000);  






