var thirteenthMonth = function(months){
	if(months < 12) return months;
	else return 12;
}

exports.get = function(req, callBack){
	var db = req.db;
	var PhilHealth = db.get("PhilHealth");
	var Employees = db.get("Employees");
	var SSS = db.get("SSS");
	var BIR = db.get("BIRTemp");
	var metadata = db.get("metadataTemp");
	var adviceNumbers = db.get('adviceNumbers');

	PhilHealth.find({}, function(err, ph){
		if(err) return callBack(err);
		SSS.find({},function(err1, sss){
			if(err1) return callBack(err1);
			Employees.find({}, function(err2, doc){
				if(err2) return callBack(err2);
				BIR.find({}, function(err3, bir){
					if(err3) return callBack(err3);
					metadata.findOne({"name": "BIR"},function(err4, metadata){
						if(err4) return callBack(err4);
						adviceNumbers.findOne({"name": "paySlip"}, function(err5, an){
							if(err5) return callBack(err5);
							callBack(null, doc, ph, sss, bir, metadata, an);
						});	
					});
				});
			});
		});
	});
}

exports.insert = function(req, res, callBack){
	var db = req.db;
	var paySlip = db.get("paySlip");
	var PhilHealth = db.get("PhilHealth");
	var Employees = db.get("Employees");
	var SSS = db.get("SSS");
	var BIR = db.get("BIR");
	var adviceNumbers = db.get("adviceNumbers");
	var metadata = db.get("metadata");
	var eID = parseInt(req.body.employeeDropdown);
	var company = req.body.companyDropdown;
	var deductibles_name = req.body.deductibles_name;
	var deductibles = req.body.deductibles;
	var allowance_name = req.body.allowance_name;
	var allowance = req.body.allowance;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;

	var issuedBy = req.session.username;

	if(deductibles.constructor === Array){
		for(var i=0; i<deductibles.length;i++) deductibles[i] = parseFloat(deductibles[i]);
	}
	else{
		deductibles = [parseFloat(deductibles)];
		deductibles_name = [deductibles_name];
	}
	if(allowance.constructor === Array){
		for(var i=0; i<allowance.length;i++) allowance[i] = parseFloat(allowance[i]);
	}
	else{
		allowance = [parseFloat(allowance)];
		allowance_name = [allowance_name];
	}

	var currentAdviceNumber;

	adviceNumbers.findOne({"name": "paySlip"}, function (err, doc) {
		adviceNumbers.update({"name": "paySlip"}, {$inc:{"number": 1}});
		currentAdviceNumber = doc.number;
	});

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

	var hash = [];
	metadata.findOne({"name": "BIR"}, function(err, docs){
		hash = docs.hash;
	});

	var jsondata;

	Employees.findOne({"eID": eID}, function(err, employee){
		if(err){
			res.status(500).send("Employee find error");
		}
		console.log("employee");
		console.log(employee.name);
		PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, PHdoc){
			SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}}, function(err, SSSdoc){
				var dep = employee.dependents;
				if(employee.dependents >= 4){
					dep = 4;
				}
				BIR.findOne({"dep": dep}, function(err, BIRdoc){
					var range = BIRdoc.ranges;
					var i = 0;
					for(i = 0; i < range.length; i++){
						if(employee.salary < range[i]){
							break;
						}
					}
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

					paySlip.insert(jsondata, function(err, doc){
						if(err){
							res.status(500).send("Insert error");
						}
					});
					// console.log(PHdoc);
					// console.log(SSSdoc);
				});
			});
		});
	});
	callBack(jsondata);
}

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