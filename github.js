'use strict';
var github = require('github');

var IPSetting = process.env.IPSetting;
var portSetting = "";
if(!/(heroku)/.exec(IPSetting)){
    portSetting = ":"+(process.env.PORT || 3000).toString();
}
console.log("github.js : "+ IPSetting+portSetting+'/');


var GITHUB_CONSUMER_KEY = process.env.GITHUB_CONSUMER_KEY;
var GITHUB_CONSUMER_SECRET = process.env.GITHUB_CONSUMER_SECRET;

var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(GITHUB_CONSUMER_KEY,
    GITHUB_CONSUMER_SECRET,
    'https://github.com/',
    'login/oauth/authorize',
    'login/oauth/access_token',
    null);

var authURL = oauth2.getAuthorizeUrl({
               redirect_url: 'http://localhost:3000/auth/github/callback',
                       scope: ['repo', 'user'],
                               state: 'hogehoge'
                                   });


function githubOauthSetUp(app){
    app.get('/auth/github',function(req,res){
      res.redirect(authURL);
    })
    
    app.get('/auth/github/callback',function(req,res){
      var requestToken  = req.query.code;
      oauth2.getOAuthAccessToken(
        requestToken,
        {redirect_url: 'http://localhost:3000/auth/github/access_token'},
        function(err,accessToken,refreshToken,results){
            if(err){
                console.log(err);
                res.send(err);
            }else if(results.error){
                console.log(results);
                res.send(JSON.stringify(results));
            }else{
                req.session.githubOAuth = {};
                req.session.githubOAuth.accessToken = accessToken;
                req.session.githubOAuth.refreshToken = refreshToken;
                req.session.save(function(){
                  console.log(req.session)
                //console.log('Obtained access_token: ', accessToken);
                  res.redirect(IPSetting + portSetting + "/");
                });
            }
        }
      );
    })
}

module.exports = {githubOauthSetUp : githubOauthSetUp};
