"use strict";
var GitHub = require('github');
var bluebird = require('bluebird');

function githubNameChangeRequest(session,name){
    var client = new GitHub({
        Promise : require('bluebird')
    })

    console.log(session);

    client.authenticate({
          type: "oauth",
          token: session.githubOAuth.accessToken
    });

    client.users.update({name : name});
}

module.exports = githubNameChangeRequest;
