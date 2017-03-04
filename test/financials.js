var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";
// var helper = require('./helper');

chai.use(chaiHttp);


describe("Payslip", function(){
	var url = local;
	describe("Display page", function(){
		it("returns status 200", function(done){
			chai.request(server)
				.get('/payslip')
				.end(function(err, res){
					res.should.have.status(200);
					done();
				});
		});
	});
	describe("Insert", function(){
		it("returns status 200", function(done){
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
		});
	});
});