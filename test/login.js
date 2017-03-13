var chai = require("chai");
var chaiHttp = require("chai-http");
var binaryParser = require('superagent-binary-parser');
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
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