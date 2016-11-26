var express = require('express');
var router = express.Router();
var addEmployeeRoute = require('../models/employees/addEmployee');
var deleteEmployeeRoute = require('../models/employees/deleteEmployee');


router.get('/add', function(req, res, next){
	res.render('addEmployee');
});

router.post('/addemployee', function(req, res){
	console.log("pasok");
	addEmployeeRoute.insert(req, res, function(){
		res.redirect('/');
	});
});

router.get('/delete', function(req, res, next){
	deleteEmployeeRoute.get(req, function(err, doc){
		res.render('deleteEmployee', {
			"employees": doc
		});
	});
});

router.post('/deleteEmployee', function(req, res){
	deleteEmployeeRoute.delete(req, res, function(){
		res.redirect('/');
	});
});

module.exports = router;
