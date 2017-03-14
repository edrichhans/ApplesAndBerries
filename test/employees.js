var chai = require("chai");
var chaiHttp = require("chai-http");
var binaryParser = require('superagent-binary-parser');
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var mailer = require('../models/login/mailer');
var local = "http://localhost:8000";
var winston = require('winston');

var loginwinston = new(winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'login_test.log' })
  ]
});

chai.use(chaiHttp);

describe('Add Employee', function(){
	var url = local;
	describe('Fail due to null input', function(){
		it('returns status 500', function(done){
			chai.request(server)
			.post('/employees/addemployee')
			.send({
				name: null,
				start: 'March 3, 2017',
				birthday: 'December 1, 1997',
				position: '1',
				status: '0',
				dependents: 5,
				salary: 10000
			})
			.end(function(err, res){
				should.exist(err);
				res.should.have.status(500);
				done();
			});
		});
	});
	describe('Insert', function(){
		it('returns status 200', function(done){
			chai.request(server)
			.post('/employees/addemployee')
			.send({
				name: 'Edrich',
				start: 'March 3, 2017',
				birthday: 'December 1, 1997',
				position: '1',
				status: '0',
				dependents: 5,
				salary: 10000
			})
			.end(function(err, res){
				should.not.exist(err);
				res.should.have.status(200);
				done();
			})
		})
	})
})