var PsycheData = require('./json/psych'); 
var Users = require('./json/filltered_twitter_users'); 
var _ = require('underscore');
var fs = require('fs');

let generatePersonalArchetypes = function(personalTypes) {
  let threeTypes = _.sample(personalTypes, 3);
  while (threeTypes.length !== new Set(threeTypes).size) {
    threeTypes = _.sample(personalTypes, 3);
  }
  return threeTypes;
};

let generateStrengthWords = function(StrengthWords) {
  let fiveWords =  _.sample(StrengthWords, 6);
  while (fiveWords.length !== new Set(fiveWords).size) {
    fiveWords = _.sample(StrengthWords, 6);
  }
  return fiveWords;
};

let getBlendSentence = function(personalTypes,blendSentences) {
  let threeTypes, regexThreeTypes, sentenceIsFound0, sentenceIsFound1, sentenceIsFound2, regexSentence, profileSentenceKey;
  let types = generatePersonalArchetypes(personalTypes);
  let invertedTypes = _.invert(personalTypes);

  threeTypes = _.map(types, function(item) {return invertedTypes[item].slice(0, -1)});
  regexThreeTypes = _.map(threeTypes, function(item) {return new RegExp(item)});

  let sentencesKyes = _.keys(blendSentences);

  sentenceIsFound0 = _.filter(sentencesKyes, function(item) {
    return item.match(regexThreeTypes[0]);
  })  

  sentenceIsFound1 = _.filter(sentenceIsFound0, function(item) {
    return item.match(regexThreeTypes[1]);
  })

  sentenceIsFound2 = _.filter(sentenceIsFound1, function(item) {
    return item.match(regexThreeTypes[2]);
  })
  
  regexSentence = /user_sentence_n/;

  profileSentenceKey = _.filter(sentenceIsFound2, function(item) {return item.match(regexSentence)})[0];
  return blendSentences[profileSentenceKey];
};


let filloutProfiles = function(json, pa, sw, pabs, personalTypes,StrengthWords, blendSentences){
  var posted_time = "", status_action = "", prof_url = "", note = "", screenshot_path = "";
  for(var i = 0; i<=json.length; i++) {
    for(var key in json[i]) {
      if(!(pa in json)) {
        json[i].pa = [];
        json[i].pa.push(generatePersonalArchetypes(personalTypes));
      } 
      if(!(sw in json)) {
        json[i].sw = [];
        json[i].sw.push(generateStrengthWords(StrengthWords));
      } 
      if(!(pabs in json)) {
        json[i].pabs = [];
        json[i].pabs.push(getBlendSentence(personalTypes,blendSentences));
      }      
      if(!(posted_time in json)) {
        json[i].posted_time = '';
      }      
      if(!(status_action in json)) {
        json[i].status_action = '';
      }           
      if(!(prof_url in json)) {
        json[i].prof_url = 'http://goodco.company/' + json[i].screen_name;
      }      
      if(!(note in json)) {
        json[i].note = '';
      }
      if(!(screenshot_path in json)) {
        json[i].screenshot_path = "";
      }
    }
  }
  return json;
}

var profileData = filloutProfiles(Users, "personal_archetype", "strength_words", "personal_archetype_blend_sentences", PsycheData.PersonalArchetypes, PsycheData.StrengthWords, PsycheData.PersonalArchetypesBlendSentences);
fs.writeFile('./json/profiles.json', JSON.stringify(profileData, null, ' '), 'utf8', function(err) {
    if (err) throw err;
    console.log('file saved');
});






