'use strict';
var http = require('http');
var express = require('express');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser'); 
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var session = require('express-session');

//key
var SESSION_SECRET = process.env.SESSION_SECRET;

var index = require('./routes/index');

var app = express();
var server = http.createServer(app);


app.engine('ejs',ejs.renderFile);
app.use(cookieParser());
app.use(bodyParser.urlencoded({
      extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	maxAge: 30 * 60 * 1000 // 30min.
	})
);


app.use(index);


// リッスン
server.listen(process.env.PORT || 3000);
console.log('Listening on port %d in %s mode', server.address().port, app.settings.env);

