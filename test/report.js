var chai = require("chai");
var chaiFiles = require("chai-files");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = require("../app");
var should = chai.should();
var local = "http://localhost:8000";
// var helper = require('./helper');

chai.use(chaiHttp);
chai.use(chaiFiles);

var file = chaiFiles.file;
var dir = chaiFiles.dir;

describe("Report", function(){
  var url = local;
  describe("Generate Excel File", function(){
    before(function(done){
      chai.request(server)
      .post('/login')
      .send({
        username: 'edrichhans',
        password: 'password'
      })
      .end(function(err, res){
        done();
      });
    });
    it("creates a file in uploads folder", function(done){
      chai.request(server)
      .get('/report')
      .end(function(err, res){
        res.should.have.status(200);
        expect(file('uploads/report.xlsx')).to.exist;
        done();
      })
    })
  });
});