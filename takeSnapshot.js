var _ = require('underscore');

var json = require("./");
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


var min = 0;
var max = 0;
var interval;
var limitHundred;

interval = setInterval(function() {
  if(max < twitterHandlers.length) {
    console.log("CALLED")
    limitHundred = twitterHandlers.slice(min,max).join(', ');  
      min = max;
      max +=10; 
  } 
  else if((twitterHandlers.length- max + 10 ) < 100) {
    limitHundred = twitterHandlers.slice(min,twitterHandlers.length).join(', ');
    clearInterval(interval);
  }

}, 1000);  


var screenshot = function(users){
  var str;
  for (var j = 0; j < 10; j++) {
    console.log(users.users[j].screen_name)
    users.users[j].screenshot_path = 'images/screenshots/' + users.users[j].screen_name + '.png';

    webshot('http://localhost:3000/screenshot/' + users.users[j].screen_name, 'images/' + users.users[j].screen_name + '.png', options, function(err) {
      // screenshot now saved to google.png
    });
  }
  return users;
}(json)



