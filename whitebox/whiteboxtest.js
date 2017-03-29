var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var should = chai.should();
var payslip = require('./models/financials/paySlip.js');
var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/ApplesAndBerries');
var assert = chai.assert;