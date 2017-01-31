var Twit = require('twit');
var moment = require('moment');
var config = require('./config').anawremer;
// var config = require('./config').GraceGoodCo;
// var config = require('./config').FrankGoodCo;
// var config = require('./config').DennisGoodCo;
// var config = require('./config').BethGoodCo;
// var config = require('./config').AmandaGoodCo;
var fs = require('fs');
var T = new Twit(config);
var _ = require('underscore');
var fs = require('fs');



var screen_name = "scrappymcgyver";
var url = "goodco.company/scrappymcgyver";
var today = moment().format('LLL');


var tweetStrenghCardWithMedia = function() {
    var filename = "images/testAccountImg/" + screen_name + ".png";

    var params = {
      encoding: 'base64'
    }

    var b64 = fs.readFileSync(filename, params);

    T.post('media/upload', {media_data: b64}, uploaded);
    
    
    function uploaded(err, data, response) {
      var id = data.media_id_string;
      var tweet = {
        status: "Hey @" + screen_name + " , have a great day " + today,
        media_ids: [id]
      };
    
      T.post('statuses/update', tweet, tweeted);

      function tweeted(err, data, response) {
        if (err) {
          console.log("OH NO some error, ", err)
        } else {
          console.log("Posted!")
        }
      };
    }
}(); 


   

