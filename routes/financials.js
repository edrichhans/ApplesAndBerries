var express = require('express');
var router = express.Router();
var paySlipRoute = require('../models/financials/paySlip');
var checkVoucherRoute = require('../models/financials/checkVoucher');
var pettyCashRoute = require('../models/financials/pettyCash');
var ARRoute = require('../models/financials/AR');
var viewRoute = require('../models/financials/view');
var updateCompRoute = require('../models/financials/updateComp');

// var auth = require('../middlewares/auth');

var sess;

router.get(['/updateComp'], function(req, res, next){
	sess = req.session;
	if(sess.rights == 'admin'){
		next();
	}
	else{
		res.redirect('/');
	}
});

/* GET home page. */
router.get('/payslip', function(req, res, next){
	paySlipRoute.get(req, function(err, doc, ph, sss, bir, metadata, an){
		res.render('payslip',{
			"employees": doc,
			"philHealth": ph,
			"sss": sss,
			"bir": bir,
			"metadata": metadata,
			"an": an
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
	checkVoucherRoute.get(req, function(err, doc, an){
		res.render('checkvoucher', {
			"metadata": doc,
			"an": an
		});
	});
});

router.post('/checkvoucher', function(req, res){
	checkVoucherRoute.insert(req, res, function(){
		res.redirect('/');
	});
});

router.get('/pettycash', function(req, res, next){
	pettyCashRoute.get(req, function(err, an){
		res.render('pettycash', {
			"an": an
		});
	});
});

router.post('/pettycash', function(req, res){
	pettyCashRoute.insert(req, res, function(){
		res.redirect('/pettycash');
	});
});

router.get('/AR', function(req, res, next){
	ARRoute.get(req, function(err, an){
		res.render('pettycash', {
			"an": an
		});
	});
});

router.post('/AR', function(req, res){
	ARRoute.insert(req, res, function(){
		res.redirect('/AR_view');
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
	updateCompRoute.get(req, res, function(err, SSS, PH, BIR, metadata){
		res.render('updateComp', {
			"SSS": SSS,
			"PH": PH,
			"BIR": BIR,
			"metadata": metadata
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

router.post('/updateBIRComp', function(req, res){
	updateCompRoute.updateBIR(req, res, function(){
		res.redirect('/');
	});
});

router.get('/AR_view', function(req, res){
	ARRoute.view(req, res, function(err, docs){
		res.render('AR_view', {
			transactions: docs
		});
	});
});

router.get('/checkvoucher_view', function(req, res){
	checkVoucherRoute.view(req, res, function(err, docs){
		res.render('checkvoucher_view', {
			transactions: docs
		});
	});
});

router.get('/pettycash_view', function(req, res){
	pettyCashRoute.view(req, res, function(err, docs){
		res.render('pettycash_view', {
			transactions: docs
		});
	});
});

router.get('/payslip_view', function(req, res){
	paySlipRoute.view(req, res, function(err, docs, people){
		res.render('payslip_view', {
			transactions: docs,
			employees: people
		});
	});
});

router.get('/BIR', function(req, res){
	updateCompRoute.getBIR(req, res, function(err, BIR, metadata){
		res.render('BIR', {
			"BIR": BIR,
			"metadata": metadata
		});
	});
});

router.get('/PH', function(req, res){
	updateCompRoute.getPH(req, res, function(err, PH){
		res.render('PH', {
			"PH": PH
		});
	});
});

router.get('/SSS', function(req, res){
	updateCompRoute.getSSS(req, res, function(err, SSS){
		res.render('SSS', {
			"SSS": SSS
		});
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