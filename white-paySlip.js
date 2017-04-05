var chai = require("chai");
// var chaiHttp = require("chai-http");
var expect = chai.expect;
var should = chai.should();
var payslip = require('./models/financials/paySlip.js');
var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/ApplesAndBerries');
var assert = chai.assert;
var chaiAsPromised = require('chai-as-promised');
var chaiDateTime = require('chai-datetime');
// var helper = require('./helper');

chai.use(chaiAsPromised);
chai.use(chaiDateTime);

// console.log(server.db);

describe("Payslip", function(){
	var body = {employeeDropdown: 6, companyDropdown: "apples", deductibles_name: ['absences', 'lates'], deductibles: [100, 200], allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	var session = {username: "edrichhans"}
	var req = {body: body, db: db, session: session};
	var res;
	var return_1 = payslip.insert(req, res);
	// describe("Data flow 1: Initialization. Return values", function(){
	// 	it("should have same values with the body passed", function(done){
	// 		for(var index in return_1[1]){
	// 			assert.deepEqual(return_1[1][index], body[index]);
	// 			// console.log(return_1[1][index], body[index]);
	// 		}
	// 		done();
	// 	});
	// 	it("should have same values as db stuff", function(done){
	// 		assert.deepEqual(return_1[0].paySlip, db.get("paySlip"));
	// 		assert.deepEqual(return_1[0].PhilHealth, db.get("PhilHealth"));
	// 		assert.deepEqual(return_1[0].Employees, db.get("Employees"));
	// 		assert.deepEqual(return_1[0].SSS, db.get("SSS"));
	// 		assert.deepEqual(return_1[0].BIR, db.get("BIR"));
	// 		assert.deepEqual(return_1[0].adviceNumbers, db.get("adviceNumbers"));
	// 		assert.deepEqual(return_1[0].metadata, db.get("metadata"));
	// 		done();
	// 	});
	// 	it("should have same username as session's username", function(done){
	// 		assert.deepEqual(return_1[2].issuedBy, session.username);
	// 		done();
	// 	})
	// });
	// describe("Conditional 1: Passed deductibles as array", function(){
	// 	it("should pass conditional", function(done){
	// 		assert.deepEqual(return_1, true);
	// 		done();
	// 	});
	// });
	// describe("Conditional 1: Passed deductibles as string", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: 'lates', deductibles: 100200, allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("should fail conditional", function(done){
	// 		assert.deepEqual(return_2, false);
	// 		done();
	// 	});
	// });
	// describe("Loop 1: Deductibles length not 0", function(){
	// 	it("should go in", function(done){
	// 		assert.equal(return_1, true);
	// 		done();
	// 	});
	// });
	// describe("Loop 1: Deductibles length = 0", function(){
	// 		var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: [], deductibles: [], allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 		var session2 = {username: "edrichhans"}
	// 		var req2 = {body: body2, db: db, session: session2};
	// 		var res2;
	// 		var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("should not go in", function(done){
	// 		assert.equal(return_2, false);
	// 		done();
	// 	});
	// });
	// describe("Data flow 2: Parse float deductibles", function(){
	// 		var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: ['absences', 'lates'], deductibles: ['100', '200'], allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 		var session2 = {username: "edrichhans"}
	// 		var req2 = {body: body2, db: db, session: session2};
	// 		var res2;
	// 		var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("converts dedictibles char value of '100' to 100", function(done){
	// 		assert.equal(return_2, 100);
	// 		done();
	// 	});
	// 	it("converts dedictibles int value of 100 to 100", function(done){
	// 		assert.equal(return_1, 100);
	// 		done();
	// 	});
	// });
	// describe("Data flow 3: Put in array form, parse deductibles to float", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: 'absences', deductibles: '100', allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it('converts deductibles string to int arr and deductibles name to string arr', function(done){
	// 		assert.deepEqual(return_2, {deductibles: [100], deductibles_name: ['absences']});
	// 		done();
	// 	});
	// });
	// describe("Conditional 2: Pass Allowances as array", function(){
	// 	it("should pass conditional", function(done){
	// 		assert.equal(return_1, true);
	// 		done();
	// 	});
	// });
	// describe("Conditional 2: Pass conditionals as string", function(){
	// 	var body2 = {("Data flow 3: Put in array form, parse deductibles to float", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: 'absences', deductibles: '100', allowance_name: ['food', 'bath'], allowance: [50, 20], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it('converts deductibles string to int arr and deductibles name to string arr', function(done){
	// 		assert.deepEqual(return_2, {deductibles: [100], deductibles_name: ['absences']});
	// 		done();
	// 	});
	// });
	// describe("Conditional 2: Pass Allowances as array", function(){
	// 	it("should pass conditional", function(done){
	// 		assert.equal(return_1, true);
	// 		done();
	// 	});
	// });
	// describe("Conditional 2: Pass conditionals as string", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: ['absences'], deductibles: [100], allowance_name: 'food', allowance: 50, startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("should fail conditional", function(done){
	// 		assert.equal(return_2, false);
	// 		done();
	// 	});
	// });
	// describe("Loop 2: Allowances length not 0", function(){
	// 	it("should go in", function(done){
	// 		assert.equal(return_1, true);
	// 		done();
	// 	});
	// });
	// describe("Loop 2: Allowances length = 0", function(){
	// 		var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: ['food'], deductibles: [100], allowance_name: [], allowance: [], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 		var session2 = {username: "edrichhans"}
	// 		var req2 = {body: body2, db: db, session: session2};
	// 		var res2;
	// 		var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("should not go in", function(done){
	// 		assert.equal(return_2, false);
	// 		done();
	// 	});
	// });
	// describe("Data flow 4: Parse float allowances", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: ['absences', 'lates'], deductibles: [100, 200], allowance_name: ['food', 'bath'], allowance: ['50', '20'], startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it("converts allowances char value of '50' to 50", function(done){
	// 		assert.equal(return_2, 50);
	// 		done();
	// 	});
	// 	it("converts allowances int value of 50 to 50", function(done){
	// 		assert.equal(return_1, 50);
	// 		done();
	// 	});
	// });
	// describe("Data flow 5: Put in array form, parse allowances to float", function(){
	// 	var body2 = {employeeDropdown: 0, companyDropdown: "apples", deductibles_name: ['absences'], deductibles: ['100'], allowance_name: 'food', allowance: 50, startDate: "March 23, 2017", endDate: "March 24, 2017", issuedBy: "edrichhans"};
	// 	var session2 = {username: "edrichhans"}
	// 	var req2 = {body: body2, db: db, session: session2};
	// 	var res2;
	// 	var return_2 = payslip.insert(req2, res2, function(){});
	// 	it('converts allowances string to int arr and deductibles name to string arr', function(done){
	// 		assert.deepEqual(return_2, {allowance: [50], allowance_name: ['food']});
	// 		done();
	// 	});
	// });
	// describe("Data flow 6: currentAdviceNumber hash values, BIR, PhilHealth, and SSS Values", function(){
	// 	adviceNumbers = db.get('adviceNumbers');
	// 	metadata = db.get('metadata');
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should query advice number from database", function (done){
	// 		payslip.findPaySlipInAN(adviceNumbers).then((doc) => {
	// 			if(doc == null){
	// 				console.log("Query from database error!");
	// 				done();
	// 				return Promise.reject();
	// 			}
	// 			else{
	// 				// console.log('Advice Numbers: ', doc);
	// 				assert.typeOf(doc, 'object');
	// 				assert.equal(doc.name, 'paySlip');
	// 				adviceNumbers.findOne({name: 'paySlip'}).then((an) => {
	// 					assert.equal(doc.number, an.number);
	// 				}, doc).then(() => {
	// 					done();
	// 				}, done);
	// 				return Promise.resolve();
	// 			}
	// 		}, done);
	// 	});
	// 	it('should increment advice number by 1', function(done){
	// 		payslip.addAN({name: 'paySlip', number: 453}).then((currentAdviceNumber) => {
	// 			assert.equal(currentAdviceNumber, 454);
	// 		}).then(() => {
	// 			done();
	// 		}, done);
	// 	});
	// 	it("should query advice number from database", function (done){
	// 		payslip.findBIRInMeta(metadata).then((doc) => {
	// 			if(doc == null){
	// 				console.log("Query from database error!");
	// 				done();
	// 				return Promise.reject();
	// 			}
	// 			else{
	// 				// console.log('BIR: ', doc);
	// 				assert.typeOf(doc, 'object');
	// 				assert.equal(doc.name, 'BIR');
	// 				done();
	// 				return Promise.resolve();
	// 			}
	// 		}, done);
	// 	});
	// 	it('should return hash data from BIR table', function(done){
	// 		payslip.getHash({name: 'BIR', "hash" : [ [ 0, 0 ], [ 0, 0.05 ], [ 41.67, 0.1 ], [ 208.33, 0.15 ], [ 708.33, 0.2 ], [ 1875, 0.25 ], [ 4166.67, 0.3 ], [ 10416.67, 0.32 ] ]}).then((hash) => {
	// 			assert.deepEqual(hash, [ [ 0, 0 ], [ 0, 0.05 ], [ 41.67, 0.1 ], [ 208.33, 0.15 ], [ 708.33, 0.2 ], [ 1875, 0.25 ], [ 4166.67, 0.3 ], [ 10416.67, 0.32 ] ]);
	// 		}).then(() => {
	// 			done();
	// 		}, done);
	// 	});
	// 	it('should return an employee\'s data given a specific ID', function(done){
	// 		payslip.findEmployee(Employees, 6).then((doc) => {
	// 			assert.typeOf(doc, 'Object');
	// 			assert.equal(doc.eID, 6);
	// 			// console.log(doc);
	// 			done();
	// 		});
	// 	});
	// 	it('should return BIR table\'s data given 4 dependents.', function(done){
	// 		payslip.findBIR({dependents: 4}, BIR).then((doc) => {
	// 			assert.typeOf(doc, 'Object');
	// 			// console.log(doc);
	// 			assert.equal(doc._id, "58c80cafd8406f0a2ae809f5");
	// 		}).then(() => {
	// 			done();
	// 		});
	// 	});
	// 	it('should return BIR table\'s data given 5 dependents.', function(done){
	// 		payslip.findBIR({dependents: 5}, BIR).then((doc) => {
	// 			assert.typeOf(doc, 'Object');
	// 			assert.equal(doc._id, "58c80cafd8406f0a2ae809f5");
	// 			done();
	// 		}, done);
	// 	});
	// 	it('should return BIR table\'s data given 0 dependents.', function(done){
	// 		payslip.findBIR({dependents: 0}, BIR).then((doc) => {
	// 			assert.typeOf(doc, 'Object');
	// 			assert.equal(doc._id, "58c80cafd8406f0a2ae809f1");
	// 			done();
	// 		}, done);
	// 	});
	// 	it('should return error given -1 dependents.', function(done){
	// 		payslip.findBIR({dependents: -1}, BIR).then((doc) => {
	// 			assert.typeOf(doc, 'null');
	// 			// expect.doc.to.be.empty;
	// 			done();
	// 		}, done);
	// 	});
	// 	it('gets advice number, hash, BIR, PH, SSS into an array', function(done){
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		});
	// 		var hash = metadata.findOne({name: "BIR"}).then(metaBIR => {
	// 			return metaBIR.hash;
	// 		});
	// 		var BIRdoc = Employees.findOne({eID: 6})
	// 		.then((employee) => {
	// 			return BIR.findOne({dep: 2})
	// 		});
	// 		var PHdoc = Employees.findOne({eID: 6})
	// 		.then(employee => {
	// 			return PhilHealth.findOne({"range.to": {$gte: 14500}, "range.from": {$lte: 14500}});
	// 		})
	// 		var SSSdoc = Employees.findOne({eID: 6})
	// 		.then(employee => {
	// 			return SSS.findOne({"range.to": {$gte: 14500}, "range.from": {$lte: 14500}});
	// 		});
	// 		Promise.all([doc, hash, BIRdoc, PHdoc, SSSdoc]).then(values => {
	// 			// console.log('val', values[0][1], 'val2', values[1]);
	// 			assert.typeOf(values[0], 'array');
	// 			assert.equal(values[0][0], 454);
	// 			assert.deepEqual(values[0][1], values[1]);
	// 			assert.deepEqual(values[0][2], values[2]);
	// 			assert.deepEqual(values[0][3], values[3]);
	// 			assert.deepEqual(values[0][4], values[4]);
	// 			done();
	// 		});
	// 	});
	// });
	// describe("Data Flow 7: rename variables, get ranges of BIR", function(){
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	metadata = db.get('metadata');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should have same values as from doc, and range should be equal to BIR of 14500 range", function(done) {
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		});
	// 		var hash = metadata.findOne({name: "BIR"}).then(metaBIR => {
	// 			return metaBIR.hash;
	// 		});
	// 		var BIRdoc = Employees.findOne({eID: 6})
	// 		.then((employee) => {
	// 			return BIR.findOne({dep: 2})
	// 		});
	// 		var PHdoc = Employees.findOne({eID: 6})
	// 		.then(employee => {
	// 			return PhilHealth.findOne({"range.to": {$gte: 14500}, "range.from": {$lte: 14500}});
	// 		})
	// 		var SSSdoc = Employees.findOne({eID: 6})
	// 		.then(employee => {
	// 			return SSS.findOne({"range.to": {$gte: 14500}, "range.from": {$lte: 14500}});
	// 		})

	// 		Promise.all([doc, hash, BIRdoc, PHdoc, SSSdoc]).then(values => {
	// 			assert.typeOf(values[0], 'array');
	// 			assert.equal(values[0][0], 454);
	// 			assert.deepEqual(values[0][1], values[1]);
	// 			assert.deepEqual(values[0][2], values[2]);
	// 			assert.deepEqual(values[0][3], values[3]);
	// 			assert.deepEqual(values[0][4], values[4]);
	// 			assert.deepEqual(values[0][5], values[2].ranges);
	// 			done();
	// 		});
	// 	});
	// });
	// describe("Loop 3: Range length not 0", function(){
	// 	adviceNumbers = db.get('adviceNumbers');
	// 	metadata = db.get('metadata');
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should go in", function(done){
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		})
	// 		Promise.all([doc]).then(value => {
	// 			assert.equal(value[0], true);
	// 			done();
	// 		});
	// 	});
	// });
	// describe("Conditional 3: Passed employee.salary = 14500", function(){
	// 	adviceNumbers = db.get('adviceNumbers');
	// 	metadata = db.get('metadata');
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should go in at least once", function(done){
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		})
	// 		Promise.all([doc]).then(value => {
	// 			console.log('val', value[0]);
	// 			assert.equal(value[0], true);
	// 			done();
	// 		});
	// 	});
	// });
	// describe("Data flow 8: must break and leave loop", function(){
	// 	adviceNumbers = db.get('adviceNumbers');
	// 	metadata = db.get('metadata');
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should leave the loop", function(done){
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		})
	// 		Promise.all([doc]).then(value => {
	// 			assert.equal(value[0], true);
	// 			done();
	// 		});
	// 	});
	// });
	// describe("Data flow 9: Getting final JSON data", function(){
	// 	adviceNumbers = db.get('adviceNumbers');
	// 	metadata = db.get('metadata');
	// 	Employees = db.get('Employees');
	// 	BIR = db.get('BIR');
	// 	PhilHealth = db.get('PhilHealth');
	// 	SSS = db.get('SSS');
	// 	it("should return correct data", function(done){
	// 		var doc = payslip.insert(req, res).then((ret) => {
	// 			return ret;
	// 		})
	// 		Promise.all([doc]).then(value => {
	// 			console.log(value);
	// 			assert.equal(value[0][0].eID, 6);
	// 			assert.equal(value[0][0].adviceNumber, 454);
	// 			assert.equalDate(value[0][0].dateIssued, new Date());
	// 			assert.equal(value[0][0].company, 'apples');
	// 			assert.deepEqual(value[0][0].deductibles_name, ['absences', 'lates']);
	// 			assert.deepEqual(value[0][0].deductibles, [100, 200]);
	// 			assert.deepEqual(value[0][0].allowance_name, ['food', 'bath']);
	// 			assert.deepEqual(value[0][0].allowance, [50, 20]);
	// 			assert.equal(value[0][0].startDate, 'March 23, 2017');
	// 			assert.equal(value[0][0].endDate, 'March 24, 2017');
	// 			assert.equal(value[0][0].PHreduc, 175);
	// 			assert.equal(value[0][0].SSSreduc, 526.8);
	// 			assert.equal(value[0][0].HDMFreduc, 290);
	// 			assert.equal(value[0][0].EmployerPH, 175);
	// 			assert.equal(value[0][0].EmployerSSS, 1078.2);
	// 			assert.equal(value[0][0].EmployerHDMF, 290);
	// 			assert.equal(value[0][0].BIR, 774.93);
	// 			assert.equal(value[0][0].total, 12503.27);
	// 			done();
	// 		});
	// 	});
	// });
	describe("Data flow 10: must insert to payslip DB", function(){
		adviceNumbers = db.get('adviceNumbers');
		metadata = db.get('metadata');
		Employees = db.get('Employees');
		BIR = db.get('BIR');
		PhilHealth = db.get('PhilHealth');
		SSS = db.get('SSS');
		it("should insert successfully and return inserted doc", function(done){
			var doc = payslip.insert(req, res).then((ret) => {
				return ret;
			});
			Promise.all([doc]).then(value => {
				// console.log(value);
				assert.equal(value[0].eID, 6);
				// assert.equal(value[0].adviceNumber, 454);
				assert.equalDate(value[0].dateIssued, new Date());
				assert.equal(value[0].company, 'apples');
				assert.deepEqual(value[0].deductibles_name, ['absences', 'lates']);
				assert.deepEqual(value[0].deductibles, [100, 200]);
				assert.deepEqual(value[0].allowance_name, ['food', 'bath']);
				assert.deepEqual(value[0].allowance, [50, 20]);
				assert.equal(value[0].startDate, 'March 23, 2017');
				assert.equal(value[0].endDate, 'March 24, 2017');
				assert.equal(value[0].PHreduc, 175);
				assert.equal(value[0].SSSreduc, 526.8);
				assert.equal(value[0].HDMFreduc, 290);
				assert.equal(value[0].EmployerPH, 175);
				assert.equal(value[0].EmployerSSS, 1078.2);
				assert.equal(value[0].EmployerHDMF, 290);
				assert.equal(value[0].BIR, 774.93);
				assert.equal(value[0].total, 12503.27);
				done();
			});
		});
	});
});