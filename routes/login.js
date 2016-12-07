var express = require('express');
var router = express.Router();
var loginRoute = require('../models/login/login');

var sess;

router.get('/*', function(req, res, next){
	sess = req.session;
	if(['/login', '/logout'].indexOf(req.url) !== -1
		|| sess.username)
		next();
	else{
		res.redirect('/login');
	}
});

router.get(['/addUser', '/deleteUser'], function(req, res, next){
	sess = req.session;
	if(sess.rights == 'admin'){
		next();
	}
	else{
		res.redirect('/');
	}
});

router.get('/login',function(req, res, next){
	res.render('login');
});

router.post('/login',function(req, res, next){
	loginRoute.login(req, res, function(success){
		if(success) res.redirect('/');
		else{
			res.send(500);
		}
		// if(!success) res.render('login', {error: "Invalid username or password"});
	});
});

router.get('/addUser', function(req, res){
	res.render('addUser');
});

router.post('/addUser', function(req, res, next){
	loginRoute.addUser(req, res, function(status){
		if(!status) res.redirect('/addUser');
		else res.redirect('/');
	});
});

router.get('/deleteUser', function(req, res){
	loginRoute.getUsers(req, res, function(err, doc){
		res.render('deleteUser',{
			"users": doc
		});
	});
});

router.post('/deleteUser', function(req, res, next){
	loginRoute.deleteUser(req, res, function(status){
		res.redirect('/');
	});
});

router.get('/logout', function(req, res, next){
	loginRoute.logout(req, res, function(){
		res.redirect('/');
	});
});


module.exports = router;