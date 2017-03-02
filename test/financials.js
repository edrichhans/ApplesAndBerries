var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";

chai.use(chaiHttp);

describe("Payslip", function(){
	var url = local;
	describe("Insert", function(){
		it("returns status 200", function(){
			chai.request(server)
				.post('/payslip')
				.send({
					eID: 6,
					adviceNumber: 0,
					issuedBy: 'edrichhans',
					"dateIssued": new Date(),
					"company": "Apples",
					"deductibles_name": "deductibles_name",
					"deductibles": 500,
					"allowance_name": "allowance_name",
					"allowance": 1000,
					"startDate": "March 1, 2017",
					"endDate": "March 30, 2017",
					"PHreduc": 300,
					"SSSreduc": 500,
					"HDMFreduc": 150,
					"EmployerPH": 100,
					"EmployerSSS": 100,
					"EmployerHDMF": 100,
					"BIR": 200,
					"total": 100
				})
			.end(function(err, res){
				res.should.have.status(200);
				done();
			});
		});
	});
});