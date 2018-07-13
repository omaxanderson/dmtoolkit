var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('NEW respond with a resource');
});

// POST request to update user info
router.post('/', function(req, res, next) {

	if (req.body.email && req.body.username &&
		req.body.password && req.body.passwordConf) {
		console.log("entered the body");
		
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			passwordConf: req.body.passwordConf
		}
		console.log("after creating userdata");

		User.create(userData, function(error, user) {
			if (error) {
				return next(error);
			} else {
				//req.session.userId = user._id;
				console.log("about to redirect");
				return res.redirect('/users');
			}
		});
		console.log("After user create");
	}
});

module.exports = router;
