var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";
// var helper = require('./helper');
var winston = require('winston');

var financialwinston = new(winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: 'lab2_part1.log' })
	]
});

var lab2winston = new(winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: 'lab2_part1_1.log' })
	]
});

chai.use(chaiHttp);


describe("Payslip", function(){
	var url = local;
	describe("Display page", function(){
		it("returns status 200", function(done){
			financialwinston.info("Displaying payslip page");
			chai.request(server)
				.get('/payslip')
				.end(function(err, res){
					if (err){
						lab2winston.info("error ${err}");
					}
					res.should.have.status(200);
					done();
				});
			financialwinston.info("Page displayed successfully");
		});
	});
	/*describe("Insert", function(){
		it("returns status 200", function(done){
			financialwinston.info("Inserting to payslip");
			chai.request(server)
				.post('/payslip')
				.send({
					"employeeDropdown": 6,
					"companyDropdown": "Apples",
					"deductibles_name": ["deductibles_name"],
					"deductibles": [500],
					"allowance_name": ["allowance_name"],
					"allowance": [1000],
					"startDate": "March 1, 2017",
					"endDate": "March 30, 2017",
				})
			.end(function(err, res){
				res.should.have.status(200);
				done();
			});
			financialwinston.info("Success insert to payslip. Response 200");
		});
	});*/
});