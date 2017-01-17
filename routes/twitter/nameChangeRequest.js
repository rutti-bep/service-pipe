"use strict";
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
var twitter = require("twitter");

function twitterNameChangeRequest(session,name){
	var client = new twitter({
		consumer_key: TWITTER_CONSUMER_KEY,
		consumer_secret: TWITTER_CONSUMER_SECRET,
		access_token_key: session.twitterOAuth.accessToken,
		access_token_secret: session.twitterOAuth.accessTokenSecret
	})
    
	client.post('account/update_profile',{name: name},function(error,responce){
		if(error){
			console.log(error);	
			return "error!!";
		}else{
			return "success!!";
		}
	})
	
}

module.exports = twitterNameChangeRequest;
