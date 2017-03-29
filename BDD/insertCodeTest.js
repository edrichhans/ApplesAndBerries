var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect();
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";

chai.use(chaiHttp);

describe("Payslip", function(){
	var url = local;
	describe("Insert", function(){
		it("returns status 200", function(done){
			chai.request(server)
				.post('/payslip')
				.send({
					"employeeDropdown": 1,
					"companyDropdown": "Berries",
					"deductibles_name": ["samplededuct"],
					"deductibles": [500],
					"allowance_name": ["sampleallow"],
					"allowance": [1000],
					"startDate": "March 1, 2017",
					"endDate": "March 30, 2017",
				})
			.end(function(err, res){
				if (res.body.deductibles_name[0] == "samplededuct"){
					console.log("name ok");
				}
				else{
					console.log("name not ok");
				}

				if (res.body.deductibles[0] == 500){
					console.log("value ok");
				}
				else{
					console.log("value not ok");
				}
				done();
			});
		});
	});
});