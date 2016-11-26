var express = require('express');
var session = require('express-session');
var router = express.Router();
var paySlipRoute = require('../models/financials/paySlip');
var checkVoucherRoute = require('../models/financials/checkVoucher');
var pettyCashRoute = require('../models/financials/pettyCash');
var ARRoute = require('../models/financials/AR');
var viewRoute = require('../models/financials/view');
var loginRoute = require('../models/login/login');
var updateCompRoute = require('../models/financials/updateComp');

// var auth = require('../middlewares/auth');

var sess;

router.use(session({secret: 'shhhhh'}));

router.get(['/employees/*', '/updateComp'], function(req, res, next){
	sess = req.session;
	if(sess.rights == 'admin'){
		next();
	}
	else{
		res.redirect('/');
	}
});

router.get('/*', function(req, res, next){
	sess = req.session;
	if(['/login', '/logout'].indexOf(req.url) !== -1
		|| sess.username)
		next();
	else{
		res.redirect('/login');
	}
});

router.get('/login',function(req, res, next){
	res.render('login');
});

router.post('/login',function(req, res, next){
	loginRoute.login(req, res, function(success){
		if(success) res.redirect('/');
		if(!success) res.render('login', {error: "Invalid username or password"});
	});
});

router.get('/logout', function(req, res, next){
	loginRoute.logout(req, res, function(){
		res.redirect('/');
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Apples and Berries Payroll System' });
});

router.get('/payslip', function(req, res, next){
	paySlipRoute.get(req, function(err, doc, ph, sss){
		res.render('payslip',{
			"employees": doc,
			"philHealth": ph,
			"sss": sss
		});
	});
});

router.post('/payslip', function(req, res){
	paySlipRoute.insert(req, res, function(){
		res.redirect('/');
	});
});

router.post('/thirteenth', function(req, res){
	paySlipRoute.thirteenth(req, res, function(){
		res.redirect('/');
	});
});

router.get('/checkvoucher', function(req, res, next){
	checkVoucherRoute.get(req, function(err, doc){
		res.render('checkvoucher', {
			"metadata": doc
		});
	});
});

router.post('/checkvoucher', function(req, res){
	checkVoucherRoute.insert(req, res, function(){
		res.redirect('/');
	});
});

router.get('/pettycash', function(req, res, next){
	res.render('pettycash');
});

router.post('/pettycash', function(req, res){
	pettyCashRoute.insert(req, res, function(){
		res.redirect('/pettycash');
	});
});

router.get('/AR', function(req, res, next){
	res.render('AR');
});

router.post('/AR', function(req, res){
	ARRoute.insert(req, res, function(){
		res.redirect('/AR');
	});
});

router.get('/view', function(req, res, next){
	res.render('view');
});

router.post('/view', function(req, res){
	viewRoute.viewSpecific(req, res, function(err, transaction, docs, people){
		res.render('view', {
			type: transaction,
			transactions: docs,
			employees: people
		});
	})
});

router.get('/updateComp', function(req, res){
	updateCompRoute.get(req, res, function(err, SSS, PH){
		res.render('updateComp', {
			"SSS": SSS,
			"PH": PH
		});
	});
});

router.post('/updateSSSComp', function(req, res){
	updateCompRoute.updateSSS(req, res, function(){
		res.redirect('/');
	});
});

router.post('/updatePHComp', function(req, res){
	updateCompRoute.updatePH(req, res, function(){
		res.redirect('/');
	});
});

module.exports = router;

//========================================================
// router.get('/createPhilHealthTable', function(req, res, next){
// 	var db = req.db;
// 	var PHTable = db.get("PhilHealth");
// 	for(i = 1; i < 29; i++){
// 		PHTable.insert({
// 			"bracket": i,
// 			"range": {"from": 7000+1000*i, "to": 7999+1000*i},
// 			"base": 7000+1000*i,
// 			"premium": 175+25*i,
// 			"share": (175+25*i)/2
// 		});
// 	}
// 	res.redirect('/');
// });
// router.get('/createSSSTable', function(req, res, next){
// 	var db = req.db;
// 	var SSSTable = db.get("SSS");
// 	function getEC(credit){
// 		if(credit >= 15000){
// 			return 30;
// 		}
// 		else return 10;
// 	}
// 	for(i = 1; i < 31; i++){
// 		SSSTable.insert({
// 			"range": {"from": 750+500*i, "to": 1249.99+500*i},
// 			"credit": 1000+500*i,
// 			"totalER": (Math.round((1000+500*i)*0.7366666666666666666666)/10 + getEC(1000+500*i)).toFixed(2),
// 			"totalEE": (Math.round((1000+500*i)*0.3633333333333333333333)/10).toFixed(2),
// 			"EC": getEC(1000+500*i),
// 			"total": (1000+500*i)*0.11 + getEC(1000+500*i)
// 		});
// 	}
// 	res.redirect('/');
// });