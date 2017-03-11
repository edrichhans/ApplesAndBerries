var chai = require("chai");
var chaiHttp = require("chai-http");
var binaryParser = require('superagent-binary-parser');
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
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