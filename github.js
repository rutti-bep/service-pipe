'use strict';
var github = require('github');

var GITHUB_CONSUMER_KEY = process.env.GITHUB_CONSUMER_KEY;
var GITHUB_CONSUMER_SECRET = process.env.GITHUB_CONSUMER_SECRET;

var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(GITHUB_CONSUMER_KEY,
    GITHUB_CONSUMER_SECRET,
    'https://github.com/',
    'login/oauth/authorize',
    'login/oauth2/access_token',
    null);

var authURL = oauth2.getAuthorizeUrl({
               redirect_uri: 'http://localhost:3000/auth/github/callback',
                       scope: ['repo', 'user'],
                               state: ''
                                   });

console.log(authURL);

function githubOauthSetUp(app){
    app.get('/auth/github',function(req,res){
      res.redirect(authURL);
    })
    
    app.get('/auth/github/callback',function(req,res){
      console.log(req);
    })
}

module.exports = {githubOauthSetUp : githubOauthSetUp};
