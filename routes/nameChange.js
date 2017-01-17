"use strict";
var twitterNameChange = require("./twitter/nameChangeRequest");
var githubNameChange = require("./github/nameChangeRequest");

function nameChange(session,inputList){
  console.log(session);
  if(!inputList.name == false){
    if(!inputList.twitter == false){
     console.log("twitter");
     twitterNameChange(session,inputList.name);
    }
    if(!inputList.github == false){
     console.log("github");
     githubNameChange(session,inputList.name);
    }
  }else{
     console.log("namechange.js : name is not found");
  }
  
}

module.exports = nameChange;
