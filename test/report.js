var chai = require("chai");
var chaiFiles = require("chai-files");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";
var report = require('../models/financials/report.js');
// var helper = require('./helper');

chai.use(chaiHttp);
chai.use(chaiFiles);

var file = chaiFiles.file;
var dir = chaiFiles.dir;

describe("Report", function(){
	var url = local;
	describe("Generate Excel File", function(){
		it("creates a file in uploads folder", function(done){
			chai.request(server)
			.get('/report')
			.end(function(err, res){
				res.should.have.status(200);
				expect(file('uploads/report.xlsx')).to.exist;
				done();
			});
		});
	});
	// describe("check_date()", function(){
	// 	it("should sort the the array into object of months", function(done){
	// 		var arr = [{dateIssued: '2017-05-25'}, {dateIssued: '2017-04-25'}, {dateIssued: '2017-04-24'}, {dateIssued: '2017-06-24'}, {dateIssued: '2017-04-23'}, {dateIssued: '2017-06-24'}];
	// 		var out = report.check_date(arr);
 //      out.should.have.property('2017-05');
 //      out['2017-05'].length.should.equal(1);
 //      out.should.have.property('2017-04');
 //      out['2017-04'].length.should.equal(3);
	// 		out.should.have.property('2017-06');
 //      out['2017-06'].length.should.equal(2);
 //      done();
	// 	});
	// });
});