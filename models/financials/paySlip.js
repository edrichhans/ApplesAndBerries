var winston = require('winston');
var environment = process.env.NODE_ENV || 'development';

var payslipmodel = new(winston.Logger)({
	transports: [
		new (winston.transports.File)({
      		filename: '//payslipmodel_test.log',
      		level: environment === 'development' ? 'debug' : 'info'
    	})
	]
});

//payslipmodel.info("Function called at models/financials/paySlip.js");

var thirteenthMonth = function(months){
	//payslipmodel.info("Accepting thirteenthMonth Pay");
	if (months < 0){
		//payslipmodel.debug("Months ${months} is less than 0. Invalid input.");
	}
	if (months > 0 && months < 12){
		//payslipmodel.debug("Months ${months} is valid.");
	}
	if (months > 12){
		//payslipmodel.debug("Months ${months} is greater than 12. Invalid input. Setting months value to 12.");
	}
	if(months < 12) return months;
	else return 12;
}

exports.get = function(req, callBack){

	//payslipmodel.info("Preparing database...");
	var db = req.db;
	//payslipmodel.info("Getting Philhealth document from database...");
	var PhilHealth = db.get("PhilHealth");
	//payslipmodel.info("Getting Employees document from database...");
	var Employees = db.get("Employees");
	//payslipmodel.info("Getting SSS document from database...");
	var SSS = db.get("SSS");
	//payslipmodel.info("Getting BIR document from database...");
	var BIR = db.get("BIRTemp");
	//payslipmodel.info("Getting metadata document from database...");
	var metadata = db.get("metadataTemp");
	//payslipmodel.info("Getting advicenumbers document from database...");
	var adviceNumbers = db.get('adviceNumbers');

	PhilHealth.find({}, function(err, ph){
		if(err) {
			//payslipmodel.debug("Getting Philhealth document from database failed. Err ${err}.");
			return callBack(err);
		}
		SSS.find({},function(err1, sss){
			if(err1) {
				//payslipmodel.debug("Getting SSS document from database failed. Err ${err}.");
				return callBack(err1);
			}
			Employees.find({}, function(err2, doc){
				if(err2) {
					//payslipmodel.debug("Getting Employees document from database failed. Err ${err}.");
					return callBack(err2);
				}
				BIR.find({}, function(err3, bir){
					if(err3) {
						//payslipmodel.debug("Getting BIR document from database failed. Err ${err}.");
						return callBack(err3);
					}
					metadata.findOne({"name": "BIR"},function(err4, metadata){
						if(err4) {
							//payslipmodel.debug("Getting Philhealth document from database failed. Err ${err}.");
							return callBack(err4);
						}
						adviceNumbers.findOne({"name": "paySlip"}, function(err5, an){
							if(err5) {
								//payslipmodel.debug("Getting Philhealth document from database failed. Err ${err}.");
								return callBack(err5);
							}
							//payslipmodel.debug("All documents from database received.");
							callBack(null, doc, ph, sss, bir, metadata, an);
						});	
					});
				});
			});
		});
	});
}

<<<<<<< HEAD
exports.insert = function(req, res, callBack){
	payslipmodel.info("Preparing database...");
=======
function getHDMF(salary){
	if(salary <= 1500) return salary*0.01;
	else return salary*0.02;
}

function getSum(arr){
	var result = 0;
	for(var i = 0; i < arr.length; i++){
		result += arr[i];
	}
	return result;
}

exports.findPaySlipInAN = function(adviceNumbers){
	return adviceNumbers.findOne({name: "paySlip"});
}

exports.addAN = function (doc){
	return new Promise((resolve, reject) => {
		var currentAdviceNumber = doc.number + 1;
		resolve(currentAdviceNumber);
	}, doc);
}

exports.findBIRInMeta = function(metadata){
		return metadata.findOne({"name": "BIR"});
}

exports.getHash = function(doc){
	return new Promise((resolve, reject) => {
		var hash = doc.hash;
		resolve(hash);
	}, doc);
}

exports.findEmployee = function(Employees, eID){
	return Employees.findOne({"eID": eID});
}

exports.findBIR = function(employee){
	var dep = employee.dependents;
	if(dep >= 4){
		dep = 4;
	}
	return BIR.findOne({dep: dep});
}

exports.findPhilHealth = function(employee){
	return PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}});
}

exports.findSSS = function(employee){
	return SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}});
}

exports.insert = function(req, res){
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82
	var db = req.db;
	payslipmodel.info("Getting paySlip document from database...");
	var paySlip = db.get("paySlip");
	payslipmodel.info("Getting Philhealth document from database...");
	var PhilHealth = db.get("PhilHealth");
	payslipmodel.info("Getting Employees document from database...");
	var Employees = db.get("Employees");
	payslipmodel.info("Getting SSS document from database...");
	var SSS = db.get("SSS");
	payslipmodel.info("Getting BIR document from database...");
	var BIR = db.get("BIR");
	payslipmodel.info("Getting advicenumbers document from database...");
	var adviceNumbers = db.get("adviceNumbers");
	payslipmodel.info("Getting metadata document from database...");
	var metadata = db.get("metadata");
	payslipmodel.info("Reading employee name from form...");
	var eID = parseInt(req.body.employeeDropdown);
	payslipmodel.info("Reading company name from form...");
	var company = req.body.companyDropdown;
	payslipmodel.info("Reading deductible names from form...");
	var deductibles_name = req.body.deductibles_name;
	payslipmodel.info("Reading deductible values from form...");
	var deductibles = req.body.deductibles;
	payslipmodel.info("Reading allowance names from form...");
	var allowance_name = req.body.allowance_name;
	payslipmodel.info("Reading allowance values from form...");
	var allowance = req.body.allowance;
	payslipmodel.info("Reading employee startdate from form...");
	var startDate = req.body.startDate;
	payslipmodel.info("Reading employee enddate from form...");
	var endDate = req.body.endDate;
	var issuedBy = req.session.username;
	payslipmodel.info("Logging action. Issued by ${issuedBy}.");

	// return [{paySlip: paySlip, PhilHealth: PhilHealth, Employees: Employees, SSS: SSS, BIR: BIR, adviceNumbers: adviceNumbers, metadata: metadata}, {employeeDropdown: eID, companyDropdown: company, deductibles_name: deductibles_name, deductibles: deductibles, allowance_name: allowance_name, allowance: allowance, startDate: startDate, endDate: endDate}, {issuedBy: issuedBy}];

	if(deductibles.constructor === Array){
<<<<<<< HEAD
		payslipmodel.info("Multiple deductibles found.");
		for(var i=0; i<deductibles.length;i++) deductibles[i] = parseFloat(deductibles[i]);
=======
		// return true;
		for(var i=0; i<deductibles.length;i++) {
			// console.log(deductibles.length);
			// return true;
			deductibles[i] = parseFloat(deductibles[i]);
			// return deductibles[i];
		}
		// return false;
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82
	}
	else{
		// return false;
		deductibles = [parseFloat(deductibles)];
		deductibles_name = [deductibles_name];
		// return {deductibles: deductibles, deductibles_name: deductibles_name};
	}
	if(allowance.constructor === Array){
<<<<<<< HEAD
		payslipmodel.info("Multiple allowances found.");
		for(var i=0; i<allowance.length;i++) allowance[i] = parseFloat(allowance[i]);
=======
		// return true;
		for(var i=0; i<allowance.length;i++){
			// return true;
			allowance[i] = parseFloat(allowance[i]);
			// return allowance[i];
		}
		// return false;
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82
	}
	else{
		// return false;
		allowance = [parseFloat(allowance)];
		allowance_name = [allowance_name];
		// return {allowance: allowance, allowance_name: allowance_name};
	}
	
//=========================== start of change =============================

	var a = this.findPaySlipInAN(adviceNumbers)
		.then(this.addAN);
	
	var b = this.findBIRInMeta(metadata)
		.then(this.getHash);

<<<<<<< HEAD
	adviceNumbers.findOne({"name": "paySlip"}, function (err, doc) {
		/*payslipmodel.info("Updating advice number.");
		oldAdviceNumber = doc.number;
		payslipmodel.debug("Old advice number is ${oldAdviceNumber}.");*/
		adviceNumbers.update({"name": "paySlip"}, {$inc:{"number": 1}});
		currentAdviceNumber = doc.number;
		payslipmodel.debug("Current advice number is now ${currentAdviceNumber}");
	});

	function getHDMF(salary){
		payslipmodel.info("Getting HDMF equivalent of salary...");
		if (salary < 0){
			payslipmodel.debug("Salary ${salary} < 0. Error!");
			return 0;
		}
		else if(salary <= 1500 && salary > 0) {
			payslipmodel.debug("Salary ${salary} > 0 and <= 1500.");
			HDMFcost = salary*0.01;
			payslipmodel.debug("HDMF equivalent is ${HDMFcost}.");
			return salary*0.01;
		}
		else {
			payslipmodel.debug("Salary ${salary} > 1500.");
			HDMFcost = salary*0.02;
			payslipmodel.debug("HDMF equivalent is ${HDMFcost}.");
			return salary*0.02;
		}
	}
=======
	var c = this.findEmployee(Employees, eID)
		.then(this.findBIR);

	var d = this.findEmployee(Employees, eID)
		.then((employee) => {
			return PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}})
		});
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82

	var e = this.findEmployee(Employees, eID)
		.then(employee => {
			return SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}});
		});

<<<<<<< HEAD
	var hash = [];
	metadata.findOne({"name": "BIR"}, function(err, docs){
		payslipmodel.info("Storing BIR values into hash...");
		hash = docs.hash;
	});
=======
	var f = this.findEmployee(Employees, eID);
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82

	return Promise.all([a,b,c,d,e,f]).then(values => {
		// return values;
		var currentAdviceNumber = values[0];
		var hash = values[1];
		var BIRdoc = values[2];
		var PHdoc = values[3];
		var SSSdoc = values[4];
		var employee = values[5];
		var range = BIRdoc.ranges;
		var i;
		// return [currentAdviceNumber, hash, BIRdoc, PHdoc, SSSdoc, range];

<<<<<<< HEAD
	Employees.findOne({"eID": eID}, function(err, employee){
		payslipmodel.info("Searching for employee with id ${eID}...");
		if (err) {
			payslipmodel.debug("Employee with id ${eID} not found. Error!");
			res.status(500).send("Employee find error");
		}
		console.log("employee");
		console.log(employee.name);
		PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, PHdoc){
			payslipmodel.info("Searching for PhilHealth amount of employee.");
			if (err) {
				payslipmodel.debug("PhilHealth for salary range [${PHdoc.range.from}, ${PHdoc.range.to}] not available.");
			}
			SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, SSSdoc){
				payslipmodel.info("Searching for SSS amount of employee.");
				if (err) {
					payslipmodel.debug("SSS for salary range [${SSSdoc.range.from}, ${SSSdoc.range.to}] not available.");
				}
				payslipmodel.info("Getting number of dependents of employee...");
				var dep = employee.dependents;
				
				//check data type of dependent
				if (employee.dependents < 0){
					payslipmodel.debug("Dependents ${employee.dependents} not a valid value.");
				}
				else if(employee.dependents >= 4){
					payslipmodel.debug("Dependents ${employee.dependents} >= 4.");
					dep = 4;
				}
				BIR.findOne({"dep": dep}, function(err, BIRdoc){
					payslipmodel.info("Searching correct BIR value for dependents ${dep}...");
					var range = BIRdoc.ranges;
					var i = 0;
					for(i = 0; i < range.length; i++){
						if(employee.salary < range[i]){
							break;
						}
					}
					i -= 1;
					payslipmodel.info("Computing tax...");
					var tax = ((employee.salary - range[i]) * hash[i][1]) + hash[i][0];
					tax = Math.round(tax*100)/100

					payslipmodel.info("Getting EE, ER and HDMF of employee...");
					var EE = parseFloat(SSSdoc.totalEE);
					var ER = parseFloat(SSSdoc.totalER);
					var HDMF = getHDMF(employee.salary);
					HDMF = Math.round(HDMF*100)/100;

					jsondata = {
						"eID": eID,
						"adviceNumber": currentAdviceNumber,
						"issuedBy": issuedBy,
						"dateIssued": new Date(),
						"company": company,
						"deductibles_name": deductibles_name,
						"deductibles": deductibles,
						"allowance_name": allowance_name,
						"allowance": allowance,
						"startDate": startDate,
						"endDate": endDate,
						"PHreduc": PHdoc.share,
						"SSSreduc": EE,
						"HDMFreduc": HDMF,
						"EmployerPH": PHdoc.share,
						"EmployerSSS": ER,
						"EmployerHDMF": employee.salary*0.02,
						"BIR": tax,
						"total": employee.salary - getSum(deductibles) + getSum(allowance) - PHdoc.share - EE - HDMF - tax
					}

					paySlip.insert(jsondata, function(err, doc){
						if(err){
							payslipmodel.debug("Error in inserting values to database...");
							res.status(500).send("Insert error");
						}
					});
					// console.log(PHdoc);
					// console.log(SSSdoc);
				});
			});
		});
=======
		for(i = 0; i < range.length; i++){
			// return true;
			if(employee.salary < range[i]){
				// return true;
				break;
			}
		}
		// return true;
		// return false;
		// return false;
		i -= 1;
		var tax = ((employee.salary - range[i]) * hash[i][1]) + hash[i][0];
		tax = Math.round(tax*100)/100

		var EE = parseFloat(SSSdoc.totalEE);
		var ER = parseFloat(SSSdoc.totalER);
		var HDMF = getHDMF(employee.salary);
		HDMF = Math.round(HDMF*100)/100;

		jsondata = {
			"eID": eID,
			"adviceNumber": currentAdviceNumber,
			"issuedBy": issuedBy,
			"dateIssued": new Date(),
			"company": company,
			"deductibles_name": deductibles_name,
			"deductibles": deductibles,
			"allowance_name": allowance_name,
			"allowance": allowance,
			"startDate": startDate,
			"endDate": endDate,
			"PHreduc": PHdoc.share,
			"SSSreduc": EE,
			"HDMFreduc": HDMF,
			"EmployerPH": PHdoc.share,
			"EmployerSSS": ER,
			"EmployerHDMF": employee.salary*0.02,
			"BIR": tax,
			"total": employee.salary - getSum(deductibles) + getSum(allowance) - PHdoc.share - EE - HDMF - tax
		}
		return [jsondata];
	}).then(data => {
		return paySlip.insert(data[0]);
	}).then((doc) => {
		if(doc){
			// res.status(500).send('Insert error');
			// return(true);
			return doc;
		}
		else{
			// res.status(200);
			// return(false);
			return "error inserting!";
		}
>>>>>>> 23345d2e6fca3ac9d03f668ff059d335bbda9b82
	});
}

	// var jsondata;	

	// Employees.findOne({"eID": eID}, function(err, employee){
	// 	if(err){
	// 		res.status(500).send("Employee find error");
	// 	}
	// 	console.log("employee");
	// 	console.log(employee.name);
	// 	PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, PHdoc){
	// 		SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, SSSdoc){
	// 			var dep = employee.dependents;
	// 			if(employee.dependents >= 4){
	// 				dep = 4;
	// 			}
	// 			BIR.findOne({"dep": dep}, function(err, BIRdoc){
	// 				var range = BIRdoc.ranges;
	// 				var i = 0;
	// 				for(i = 0; i < range.length; i++){
	// 					if(employee.salary < range[i]){
	// 						break;
	// 					}
	// 				}
	// 				i -= 1;
	// 				var tax = ((employee.salary - range[i]) * hash[i][1]) + hash[i][0];
	// 				tax = Math.round(tax*100)/100

	// 				var EE = parseFloat(SSSdoc.totalEE);
	// 				var ER = parseFloat(SSSdoc.totalER);
	// 				var HDMF = getHDMF(employee.salary);
	// 				HDMF = Math.round(HDMF*100)/100;

	// 				jsondata = {
	// 					"eID": eID,
	// 					"adviceNumber": currentAdviceNumber,
	// 					"issuedBy": issuedBy,
	// 					"dateIssued": new Date(),
	// 					"company": company,
	// 					"deductibles_name": deductibles_name,
	// 					"deductibles": deductibles,
	// 					"allowance_name": allowance_name,
	// 					"allowance": allowance,
	// 					"startDate": startDate,
	// 					"endDate": endDate,
	// 					"PHreduc": PHdoc.share,
	// 					"SSSreduc": EE,
	// 					"HDMFreduc": HDMF,
	// 					"EmployerPH": PHdoc.share,
	// 					"EmployerSSS": ER,
	// 					"EmployerHDMF": employee.salary*0.02,
	// 					"BIR": tax,
	// 					"total": employee.salary - getSum(deductibles) + getSum(allowance) - PHdoc.share - EE - HDMF - tax
	// 				}

	// 				paySlip.insert(jsondata, function(err, doc){
	// 					if(err){
	// 						res.status(500).send("Insert error");
	// 					}
	// 				});
	// 				// console.log(PHdoc);
	// 				// console.log(SSSdoc);
	// 			});
	// 		});
	// 	});
	// });
	// callBack(jsondata);
// }

exports.thirteenth = function(req, res, callBack){
	var db = req.db;
	var Employees = db.get('Employees');
	var eID = parseInt(req.body.employeeDropdown);
	var company = req.body.companyDropdown;
	var adviceNumbers = db.get('adviceNumbers');
	var m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var paySlip = db.get('paySlip');

	var issuedBy = req.session.username;

	var dateIssued = new Date();

	var currentAdviceNumber;

	adviceNumbers.findOne({"name": "paySlip"}, function (err, doc) {
		adviceNumbers.update({"name": "paySlip"}, {$inc:{"number": 1}});
		currentAdviceNumber = doc.number;
	});

	Employees.findOne({"eID": eID}, function(err, employee){
		if(err){
			res.status(500).send('findOne error');
		}
		var date = employee.startDate;

		date = date.split(/[ ,]+/);
		var months = dateIssued.getMonth() - m_names.indexOf(date[0]);
		var years = dateIssued.getFullYear() - parseInt(date[2]);

		var diff = years + months;

		var total = employee.salary/12 * thirteenthMonth(diff);

		paySlip.insert({
			"eID": eID,
			"adviceNumber": currentAdviceNumber,
			"dateIssued": dateIssued,
			"issuedBy": issuedBy,
			"company": company,
			"deductibles": 0,
			"allowance": 0,
			"PHreduc": 0,
			"SSSreduc": 0,
			"HDMFreduc": 0,
			"EmployerPH": 0,
			"EmployerSSS": 0,
			"EmployerHDMF": employee.salary*0.02,
			"total": total
		}, function(err, doc){
			if(err){
				res.status(500).send('Insert error');
			}
		});
	});
	callBack();
}

exports.view = function(req, res, callBack){
	var db = req.db;
	var paySlip = db.get('paySlip');
	var Employees = db.get('Employees');

	paySlip.find({},function(err, docs){
		if(err) return callBack(err);
		Employees.find({}, function(err1, people){
			if(err1) return callBack(err1);
			callBack(null, docs, people);
		});
	});
}