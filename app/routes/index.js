var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET requests */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/logout', function(req, res, next) {
	if (req.session) {
		req.session.destroy(function(err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/profile', function(req, res, next) {
	var data = {
		username: "placeholder"
	}
	User.findOne({_id: req.session.userId}).exec(function(err, user) {
		if (err) {
			console.log(err);
			return res.render('login');
		} else if (!user) {
			console.log("User not found");
			return res.render('login', {err: "Internal server error"});
		} else {
			data.username = user.username
			return res.render('profile', data);
		}
	});
});

/* POST requests */
router.post('/login', function(req, res, next) {
	if (req.body.email && req.body.username &&
		req.body.password && req.body.passwordConf) {

		if (req.body.password != req.body.passwordConf) {
			// return to page with an error message
			return res.send("passwords don't match");
		}
		
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		}

		User.create(userData, function(error, user) {
			if (error) {
				return next(error);
			} else {
				req.session.userId = user._id;
				console.log("about to redirect");
				return res.redirect('/profile');
			}
		});
	} else if (req.body.loginUsername && req.body.loginPassword) {
		User.authenticate(req.body.loginUsername, req.body.loginPassword, function(error, user) {
			if (err || !user) {
				var err = new Error("Wrong email or password");
				err.status = 401;
				var errMessage = {
					err: "Incorrect email or password"
				}
				return res.render('login', errMessage);
				//return next(err);
			} else {
				req.session.userId = user._id;
				return res.redirect('/profile');
				//return res.send("Authentication successful");
			}
		});
	}

});

module.exports = router;
