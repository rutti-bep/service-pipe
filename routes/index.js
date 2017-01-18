var express = require('express');
var router = express.Router();
var fs = require('fs');

var indexJs = fs.readFileSync('./views/index.js',"utf-8");

var twitterRoutes = require("./twitter/index");
var githubRoutes = require("./github/index");
var nameChange = require("./nameChange");

router.use("/twitter",twitterRoutes);
router.use("/github",githubRoutes);

router.post("/nameChange",function(req,res){
  nameChange(req.session,req.body);
  res.end();
});

router.get('/',function(req,res){
	var ejsStatus = {};
    console.log('\n' + req.sessionID);
    console.log(req.sessionStore);
	if(req.session.twitterOAuth){
		ejsStatus['twitterButton'] = ' <b>認証済みです</b> -> <a href="/twitter/auth">別のアカウントでtwitter認証する</a>';
	}else{
		ejsStatus['twitterButton'] = ' -> <a href="/twitter/auth">twitter認証する</a>' ;
	}
	if(req.session.githubOAuth){
		ejsStatus['githubButton'] = ' <b>認証済みです</b> -> <a href="/github/auth">別のアカウントでgithubをoauth認証する</a>';
	}else{
		ejsStatus['githubButton'] = ' -> <a href="/github/auth">githubをoauth認証する</a>' ;
	}
	res.render('index.ejs',ejsStatus);
})

router.get('/index.js',function(req,res){
    res.send(indexJs);
})

module.exports = router;
