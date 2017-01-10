var _ = require('underscore');
var fs = require('fs');


var twitterHandlers = require('./json/twitterHandlers');

var already_tweeted_993 = require('./json/already_tweeted_993');
var already_tweeted_980 = require('./json/already_tweeted_980');


var uniqTwitterHandlers = _.difference(twitterHandlers, already_tweeted_993, already_tweeted_980.json);

    fs.writeFile('./json/uniqTwitterHandlers.json', JSON.stringify(uniqTwitterHandlers, null, 2), function (err) {
      if (err) return console.log(err);
    });


