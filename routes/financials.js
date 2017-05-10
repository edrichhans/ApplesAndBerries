var express = require('express');
var router = express.Router();
var paySlipRoute = require('../models/financials/paySlip');
var checkVoucherRoute = require('../models/financials/checkVoucher');
var pettyCashRoute = require('../models/financials/pettyCash');
var ARRoute = require('../models/financials/AR');
var viewRoute = require('../models/financials/view');
var updateCompRoute = require('../models/financials/updateComp');
var reportRoute = require('../models/financials/report');
var winston = require('winston');
var path = require('path');
var Promise = require('promise');

var wlogger = new winston.Logger({
	transports: [
		new (winston.transports.File)({
			level: 'info',
			filename: 'log.log',
			handleExcpetions: true,
			json: true,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExcpetions: true,
			json: false,
			colorize: true
		})
	],
	exitOnError: false
});

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

router.get('/editPayslip', function(req, res, next){
	paySlipRoute.get_edit(req, function(err, doc, ph, sss, bir, metadata, an, paySlip){
		res.render('editPayslip',{
			"employees": doc,
			"philHealth": ph,
			"sss": sss,
			"bir": bir,
			"metadata": metadata,
			"an": an,
			"paySlip": paySlip
		});
	});
});

router.post('/editPayslip', function(req, res){
	var db = req.db;
	metadata = db.get('metadata');
	Employees = db.get('Employees');
	BIR = db.get('BIR');
	PhilHealth = db.get('PhilHealth');
	SSS = db.get('SSS');
	paySlipRoute.edit(req, res).then((jsondata) => {
		wlogger.log('info', 'Payslip Edited', {
			issuedBy: req.session.username,
			issuedTo: req.body.employeeDropdown
		});
		res.status(200);
		res.redirect('/');
	});
});

router.post('/payslip', function(req, res){
	var db = req.db;
	adviceNumbers = db.get('adviceNumbers');
	metadata = db.get('metadata');
	Employees = db.get('Employees');
	BIR = db.get('BIR');
	PhilHealth = db.get('PhilHealth');
	SSS = db.get('SSS');
	paySlipRoute.insert(req, res).then((jsondata) => {
		wlogger.log('info', 'Payslip Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.employeeDropdown
		});
		res.status(200);
		res.redirect('/');
	});
});

router.post('/thirteenth', function(req, res){
	paySlipRoute.thirteenth(req, res, function(){
		wlogger.log('info', 'Thirteenth Month Pay Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.employeeDropdown
		});
		res.redirect('/');
	});
});

router.post('/editThirteenth', function(req, res){
	paySlipRoute.editThirteenth(req, res, function(){
		wlogger.log('info', 'Thirteenth Month Pay Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.employeeDropdown
		});
		res.redirect('/');
	});
});

router.post('/deletePaySlip', function(req, res){
	// console.log('REQ.BODY', req.body[0]);
	paySlipRoute.remove(req, res, function(err, doc){
		console.log("errdoc", err, doc);
		if(err){
			res.json({"error": err, "status": 500});
		}
		res.redirect('/payslip_view');
	});
});

router.post('/viewAllPaySlip', function(req, res){
	// console.log('REQ.BODY', req.body[0]);
	paySlipRoute.viewAll(req, res, function(err, doc){
		console.log("VIEWALL", err, doc);
		if(err){
			res.json({"error": err, "status": 500});
		}
		res.json({"status": 200, "data": doc});
		// res.redirect('/payslip_view');
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
		wlogger.log('info', 'Check Voucher Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.name
		});
		res.redirect('/');
	});
});

router.post('/deleteCheckvoucher', function(req, res){
	checkVoucherRoute.remove(req, res, function(err, doc){
		console.log("errdoc", err, doc);
		if(err){
			res.json({"error": err, "status": 500});
		}
		res.json({success: true, data: doc});
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
		wlogger.log('info', 'Petty Cash Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.name
		});
		res.redirect('/pettycash');
	});
});

router.post('/deletePettycash', function(req, res){
	pettyCashRoute.remove(req, res, function(err, doc){
		console.log("errdoc", err, doc);
		if(err){
			res.json({"error": err, "status": 500});
		}
		res.json({success: true, data: doc});
	});
})

router.get('/AR', function(req, res, next){
	ARRoute.get(req, function(err, an){
		res.render('AR', {
			"an": an
		});
	});
});

router.post('/AR', function(req, res){
	ARRoute.insert(req, res, function(){
		wlogger.log('info', 'Acknowledgement Receipt Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.name
		});
		res.redirect('/AR_view');
	});
});

router.post('/deleteAR', function(req, res){
	ARRoute.remove(req, res, function(err, doc){
		console.log("errdoc", err, doc);
		if(err){
			res.json({"error": err, "status": 500});
		}
		res.json({success: true, data: doc});
	});
})

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
	updateCompRoute.updateSSS(req, res, function(err){
		if(err){
			res.status(500).end();
		}
		else{
			wlogger.log('info', 'SSS Updated!', {
				issuedBy: req.session.username,
			});
			res.redirect('/');
		}
	});
});

router.post('/updatePHComp', function(req, res){
	updateCompRoute.updatePH(req, res, function(err){
		if(err){
			res.status(500).end();
		}
		else{
			wlogger.log('info', 'PhilHealth Updated!', {
				issuedBy: req.session.username,
			});
			res.redirect('/');
		}
	});
});

router.post('/updateBIRComp', function(req, res){
	updateCompRoute.updateBIR(req, res, function(err){
		if(err) res.status(500).end();
		else{
			wlogger.log('info', 'BIR Updated!', {
				issuedBy: req.session.username
			});
			res.redirect('/');
		}
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
		console.log(docs);
		res.render('payslip_view', {
			transactions: docs,
			employees: people
		});
		console.log(docs);
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

router.post('/report', function(req, res){
	reportRoute.report(req, res).then(r => {
		res.redirect('/download');
	})
	.catch(err => {
		res.json({error: err})
	});
});

router.get('/download', function(req, res, next){
	var file = 'report.xlsx';
	var p = path.resolve(".") + '/uploads/' + file

	res.download(p);
	return;
});

router.get('/manageUsers', function(req, res, next){
	res.render('manageUsers');
});

router.get('/indexFinancials', function(req, res, next){
	res.render('indexFinancials');
});

router.get('/updateTables', function(req, res, next){
	res.render('updateTables');
});

router.get('/activity_log', function(req, res, next){
	res.render('activity_log');
});

router.get('/log', function(req, res, next){
	console.log("at log");
	var p = path.resolve('../log.log');

	res.sendFile(p);
});

module.exports = router;
