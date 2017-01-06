var _ = require('underscore');

var file = "./json/profiles.json"
var json = require(file);
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
console.log("size: ", json.length)

var size = json.length;
// var size = 100;
var additionBy = 5;
var min = 0;
var max = 5;
var interval;

interval = setInterval(function() {
  var screenshot = function(users){
    for (var j = min; j < max; j++) {
      console.log("screenshot of user :", j, users[j].screen_name)

      webshot('http://localhost:3000/screenshot/' + users[j].screen_name, 'images/screenshots/' + users[j].screen_name + '.png', options, function(err) {
        if(err) throw err;
      });
      users[j].screenshot_path = 'images/screenshot/' + users[j].screen_name + '.png';

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

    fs.writeFile(file, JSON.stringify(users, null, 2), function (err) {
      if (err) return console.log(err);
    });
    
    return users;
  }(json)


}, 1000);  




