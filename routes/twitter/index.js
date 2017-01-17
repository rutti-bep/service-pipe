"use strict";
var express = require('express');
var OAuth = require('oauth').OAuth;

var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
var IPSetting = process.env.IPSetting;
var portSetting = "";
if(!/(heroku)/.exec(IPSetting)){
	portSetting = ":"+(process.env.PORT || 3000).toString();
}
console.log("twitter.js : " + IPSetting+portSetting+'/');

var router = express.Router();
var oauth = new OAuth(
				'https://api.twitter.com/oauth/request_token',
				'https://api.twitter.com/oauth/access_token',
				TWITTER_CONSUMER_KEY,
				TWITTER_CONSUMER_SECRET,
				'1.0A',
				IPSetting+portSetting+'/twitter/auth/callback',
				'HMAC-SHA1'
);

	router.get('/auth',function(req,res){
		oauth.getOAuthRequestToken(function(error,oauthToken,oauthTokenSecret,results){
			if(error){
				console.log(error);
				res.send("yeah no. didn't work.");
			}else{
				req.session.twitterOAuth = {};
				req.session.twitterOAuth.token = oauthToken;
				req.session.twitterOAuth.tokenSecret = oauthTokenSecret;
                  res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauthToken);
			}
		});
	})

	router.get('/auth/callback', function(req, res, next){
		if (req.session.twitterOAuth) {
			req.session.twitterOAuth.verifier = req.query.oauth_verifier;
			var sessionOAuth = req.session.twitterOAuth;
			oauth.getOAuthAccessToken(sessionOAuth.token,sessionOAuth.tokenSecret,sessionOAuth.verifier,
				function(error, oauthAccessToken, oauthAccessTokenSecret, results){
					if(error){
						console.log(error);
					}else{
						req.session.twitterOAuth.accessToken = oauthAccessToken;
						req.session.twitterOAuth.accessTokenSecret = oauthAccessTokenSecret;
						//res.send("TOPページに移動します");
						    res.redirect(IPSetting + portSetting + "/");
					}
			})
		}else{
				res.redirect('/auth');
		} 
	})


module.exports = router;
