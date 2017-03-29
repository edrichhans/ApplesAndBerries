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
	paySlipRoute.insert(req, res, function(jsondata){
		wlogger.log('info', 'Payslip Issued', {
			issuedBy: req.session.username,
			issuedTo: req.body.employeeDropdown
		});
		// console.log(res.body);
		res.status(200);
		res.redirect('/');
	});
});

router.get('/payslip_view', function(req, res){
	paySlipRoute.view(req, res, function(err, docs, people){
		res.render('payslip_view', {
			transactions: docs,
			employees: people
		});
		console.log(docs);
	});
});

module.exports = router;

