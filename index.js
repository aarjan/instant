var fs = require('fs')
var _ = require("lodash")
var Client = require('instagram-private-api').V1;
//var Promise = require('bluebird');


var device = new Client.Device('baskotaaarjan@gmail.com');
//var storage = new Client.CookieFileStorage(__dirname + './cookies/someuser.json');
var storage = new Client.CookieMemoryStorage();

storage.getAccountId()
	.then(function (accountId) {
		console.log(accountId);
		// will return actual userId from cookies
})




Client.Session.create(device, storage, 'baskotaaarjan', '*********')
    .then(function (session) {
        // Now you have a session, we can follow / unfollow, anything...
       // search for the specifc user
	 return [session, Client.Account.searchForUser(session, 'pre_c_ka')]
    })
    .spread(function (session, account) {
        var feed = new Client.Feed.AccountFollowing(session, account.id);
        new Promise((resolve,reject) => resolve(feed.get()))
        .then(e => fs.writeFile('followers.json',JSON.stringify(e.map(d => d._params)),err => console.log(err)))
    })

