'use strict';

var config = require('../../config');
var nodemailer = require('nodemailer');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'views/mailer');
var emailTemplates = require('email-templates');
var async = require('async');
var crypto = require('crypto');


var EmailAddressRequiredError = new Error('email address required');


// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
var defaultTransport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: config.mailer.auth.user,
		pass: config.mailer.auth.pass
	}
});

exports.forgot = function(req, res, callBack){
	var db = req.db;
	var User = db.get('Users');

	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({ username: req.body.username }, function(err, user) {
				if (!user) {
					// req.flash('error', 'No account with that email address exists.');
					return res.sendStatus(500);
				}

				else{
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

					User.update({username: req.body.username}, {$set: {resetPasswordToken: token}});
					User.update({username: req.body.username}, {$set: {resetPasswordExpires: Date.now() + 3600000}});

					// user.save(function(err) {
					//	 done(err, token, user);
					// }); 
					done(err, token, user);
				}
				return;
			});
		},
		function(token, user, done) {
			var locals = {
				email: user.email,
				subject: "Password Reset for Apples and Berries",
				name: user.username,
				resetUrl: 'http://' + req.headers.host + '/reset/' + token
			}
			exports.sendOne('password_reset', locals, function(err, status, html, text){
				done(err, 'done');
			});
		}
	], function(err) {
		if (err) return callBack(err);
		// res.redirect('/forgot');
	});
	return callBack();
}

exports.sendOne = function (templateName, locals, fn) {
	// make sure that we have an user email
	if (!locals.email) {
		return fn(EmailAddressRequiredError);
	}
	// make sure that we have a message
	if (!locals.subject) {
		return fn(EmailAddressRequiredError);
	}
	emailTemplates(templatesDir, function (err, template) {
		if (err) {
			//console.log(err);
			return fn(err);
		}
		// Send a single email
		template(templateName, locals, function (err, html, text) {
			if (err) {
				//console.log(err);
				return fn(err);
			}
			// if we are testing don't send out an email instead return
			// success and the html and txt strings for inspection
			if (process.env.NODE_ENV === 'test') {
				return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
			}
			var transport = defaultTransport;
			transport.sendMail({
				from: config.mailer.defaultFromAddress,
				to: locals.email,
				subject: locals.subject,
				html: html,
				// generateTextFromHTML: true,
				text: text
			}, function (err, responseStatus) {
				if (err) {
					return fn(err);
				}
				return fn(null, responseStatus.message, html, text);
			});
		});
	});
}

exports.resetView = function(req, res, callBack){
  var db = req.db;
  var User = db.get('Users');

  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
    if(!user){
      req.flash('error', 'Password reset token is invalid or has expired.');
      return callBack(0);
    }
    else{
      return callBack(user);
    }
  })
}

exports.reset = function(req, res, callBack){
  var db = req.db;
  var User = db.get('Users');
  async.waterfall([
    function(done){
      User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if(!user){
          req.flash('error', 'Password reset token is invalid or has expired.');
          return callBack(0);
        }
        else{
          User.update({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, {$set: {password: req.body.password, resetPasswordToken: undefined, resetPasswordExpires: undefined}});
        }
        done(err, user);
      })
    },
    function(user, done){
      var locals = {
        email: user.email,
        subject: "Your password has been changed.",
        name: user.username
      }
      exports.sendOne('password_reset', locals, function(err, done){
        // return res.redirect('/');
				return callBack();
      });
    }
  ], function(err) {
		if (err) return callBack(500);
		// res.redirect('/forgot');
	});
  return callBack();
}