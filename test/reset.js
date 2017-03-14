var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";
// var helper = require('./helper');
var winston = require('winston');

chai.use(chaiHttp);

describe('Password Reset', function(){
	var url = local;
	describe('get page', function(){
		it('should return 200', function(done){
			chai.request(server)
			.get('/reset/asdf')
			.end(function(err, res){
				res.should.have.status(200);
				done();
			});
		});
	});
});