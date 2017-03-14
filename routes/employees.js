var express = require('express');
var router = express.Router();
var addEmployeeRoute = require('../models/employees/addEmployee');
var editEmployeeRoute = require('../models/employees/editEmployee');
var winston = require('winston');

winston.configure({
	transports: [
		new (winston.transports.File)({ filename: 'log.log' })
	]
});

router.get(['/*'], function(req, res, next){
	sess = req.session;
	if(sess.rights == 'admin'){
		next();
	}
	else{
		res.redirect('/');
	}
});

router.get('/add', function(req, res, next){
	res.render('addEmployee');
});

router.post('/addemployee', function(req, res){
	console.log("pasok");
	addEmployeeRoute.insert(req, res, function(){
		winston.log('info', 'Employee added');
		res.redirect('/employees');
	});
});

router.get('/delete', function(req, res, next){
	editEmployeeRoute.get(req, function(err, doc){
		res.render('deleteEmployee', {
			"employees": doc
		});
	});
});

router.post('/deleteEmployee', function(req, res){
	editEmployeeRoute.delete(req, res, function(){
		winston.log('info', 'Employee deleted');		
		res.redirect('/');
	});
});

router.get('/editEmployee', function(req, res){
	editEmployeeRoute.getEdit(req, function(err, doc){
		res.render('editEmployee', {
			"employees": doc
		});
	});
});

router.post('/editEmployee', function(req, res){
	editEmployeeRoute.postEdit(req, res, function(err, doc){
		res.redirect('/');
		winston.log('info', 'Employee edited');
		
	});
});

router.get('/', function(req, res){
	var db = req.db;
	var Employees = db.get("Employees");
	Employees.find({}, function(err, doc){
		res.render('employeepanel', {
			"employees": doc
		});
	});
});

module.exports = router;
