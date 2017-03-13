var chai = require("chai");
var chaiHttp = require("chai-http");
var binaryParser = require('superagent-binary-parser');
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var mailer = require('../models/login/mailer');
var local = "http://localhost:8000";

chai.use(chaiHttp);

function parseJSON(res, fn){
	res.text = '';
	res.setEncoding('utf8');
	res.on('data', function(chunk){ res.text += chunk;});
	res.on('end', function(){
		try {
			var body = res.text && JSON.parse(res.text);
		} catch (e) {
			var err = e;
			// issue #675: return the raw response if the response parsing fails
			err.rawResponse = res.text || null;
			// issue #876: return the http status code if the response parsing fails
			err.statusCode = res.statusCode;
		} finally {
			fn(err, body);
		}
	});
};

describe("Login", function(){
	var url = local;
	describe("Fail due to Invalid both", function(){
		it("returns status 500", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'asdfas',
				password: 'asdfasd'
			})
			.end(function(err, res){
				res.should.have.status(500);
				done();
			});
		});
	});
	describe("Fail due to Invalid username", function(){
		it("returns status 500", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'asdfas',
				password: 'password'
			})
			.end(function(err, res){
				res.should.have.status(500);
				done();
			});
		});
	});
	describe("Fail due to Invalid password", function(){
		it("returns status 500", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'edrichhans',
				password: 'asdfasd'
			})
			.end(function(err, res){
				res.should.have.status(500);
				done();
			});
		});
	});
	describe("Fail due to blank", function(){
		it("returns status 500", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'edrichhans',
				password: 'asdfasd'
			})
			.end(function(err, res){
				res.should.have.status(500);
				done();
			});
		});
	});
	describe("Pass Admin", function(){
		it("returns status 200", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'edrichhans',
				password: 'password'
			})
			.end(function(err, res){
				res.should.have.status(200);
				done();
			});
		});
	});
	describe("Pass User", function(){
		it("returns status 200", function(done){
			chai.request(server)
			.post('/login')
			.send({
				username: 'bob',
				password: 'password'
			})
			.buffer()
			.parse()
			.end(function(err, res){
				res.should.have.status(200);
				// res.body.should.have.property('rights');
				console.log(res.body);
				done();
			});
		});
	});
});

describe('mailer: models', function () {
	describe('#sendOne()', function (done) {
		it('should render the password reset templates correctly', function (done) {
			var locals = {
				email: 'edrichhans@gmail.com',
				subject: 'Password reset',
				name: 'Forgetful User',
				resetUrl: 'http://localhost:8000/password_rest/000000000001|afdaevdae353'
			};
			mailer.sendOne('password_reset', locals, function (err, responseStatus, html, text) {
				should.not.exist(err);
				responseStatus.should.include("OK");
				text.should.include("Please follow this link to reset your password " + locals.resetUrl);
				html.should.include("Please follow this link to reset your password <a href=\"" + locals.resetUrl + "\">" + locals.resetUrl + "</a>");
				done();
			});
			done();
		});
	});
	describe('forgot', function(){
		it('should render the password reset templates correctly', function(done){
			chai.request(server)
			.post('/forgot')
			.send({
				username: 'edrichhans'
			})
			.end(function(err, res){
				should.not.exist(err);
        res.should.have.status(200);
        done();
			});
		})
	})
});