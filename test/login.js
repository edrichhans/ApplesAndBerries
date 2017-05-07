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
			loginwinston.info("Logging in");
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
			loginwinston.error("Username and password are invalid. Response 500");
		});
	});
	describe("Fail due to Invalid username", function(){
		it("returns status 500", function(done){
			loginwinston.info("Logging in");
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
			loginwinston.error("Username is invalid. Response 500");
		});
	});
	describe("Fail due to Invalid password", function(){
		it("returns status 500", function(done){
			loginwinston.info("Logging in");
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
			loginwinston.error("Password is invalid. Response 500");
		});
	});
	describe("Fail due to blank", function(){
		it("returns status 500", function(done){
			loginwinston.info("Logging in");
			chai.request(server)
			.post('/login')
			.send({
				username: '',
				password: ''
			})
			.end(function(err, res){
				res.should.have.status(500);
				done();
			});
			loginwinston.error("Username and password are invalid. Response 500");
		});
	});
	describe("Pass Admin", function(){
		it("returns status 200", function(done){
			loginwinston.info("Logging in");
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
			loginwinston.info("Admin login successful. Response 200");
		});
	});
	describe("Pass User", function(){
		it("returns status 200", function(done){
			loginwinston.info("Logging in");
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
			loginwinston.info("User login successful. Response 200");
		});
	});
});

describe('addUser', function(){
	describe('Valid Input', function(){
		it('Creates a new user with hash and salt field', function(done){
			chai.request(server)
			.post('/addUser')
			.send({
				username: 'testhash',
				password: 'hashthis',
				repass: 'hashthis'
			})
			.end(function(err, res){
				res.should.have.status(200);
				// res.should.be.json;
				// res.body.should.have.property('data');
				// res.body.data.should.have.property('password_salt');
				// res.body.data.should.have.property('password_hash');
				done();
			});
		});
		it('deletes this user', function(done){
			chai.request(server)
			.post('/deleteUser')
			.send({
				username: 'testhash'
			})
			.end(function(err, res){
				res.should.have.status(200);
				// res.body.should.have.property('data');
				done();
			});
		});
	});
});

describe('mailer: models', function () {
	 this.timeout(15000);
	describe('#sendOne()', function (done) {
		it('should render the password reset templates correctly', function (done) {
			var locals = {
				email: 'edrichhans@yahoo.com',
				subject: 'Password reset',
				name: 'Forgetful User',
				resetUrl: 'http://localhost:8000/password_reset/000000000001|afdaevdae353'
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
	describe('correct input', function(){
		it('should return status 200', function(done){
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
		});
	});
	 describe('Incorrect forgot', function(){
		it('should return error status (500)', function(done){
			chai.request(server)
			.post('/forgot')
			.send({
				username: 'hi1'
			})
			.end(function(err, res){
				 res.should.have.status(500);
				 done();
			});
		});
	});
});