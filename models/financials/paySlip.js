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

exports.incrementPaySlipAn = function(adviceNumbers){
	adviceNumbers.update({"name": "paySlip"}, {$inc:{"number": 1}});
	return Promise.resolve(adviceNumbers);
}

exports.findPaySlipInAN = function(adviceNumbers){
	return adviceNumbers.findOne({name: "paySlip"});
}

exports.addAN = function (doc){
	return new Promise((resolve, reject) => {
		var currentAdviceNumber = doc.number;
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

	// return [{paySlip: paySlip, PhilHealth: PhilHealth, Employees: Employees, SSS: SSS, BIR: BIR, adviceNumbers: adviceNumbers, metadata: metadata}, {employeeDropdown: eID, companyDropdown: company, deductibles_name: deductibles_name, deductibles: deductibles, allowance_name: allowance_name, allowance: allowance, startDate: startDate, endDate: endDate}, {issuedBy: issuedBy}];

	if(deductibles.constructor === Array){
		// return true;
		for(var i=0; i<deductibles.length;i++) {
			// console.log(deductibles.length);
			// return true;
			deductibles[i] = parseFloat(deductibles[i]);
			// return deductibles[i];
		}
		// return false;
	}
	else{
		// return false;
		deductibles = [parseFloat(deductibles)];
		deductibles_name = [deductibles_name];
		// return {deductibles: deductibles, deductibles_name: deductibles_name};
	}
	if(allowance.constructor === Array){
		// return true;
		for(var i=0; i<allowance.length;i++){
			// return true;
			allowance[i] = parseFloat(allowance[i]);
			// return allowance[i];
		}
		// return false;
	}
	else{
		// return false;
		allowance = [parseFloat(allowance)];
		allowance_name = [allowance_name];
		// return {allowance: allowance, allowance_name: allowance_name};
	}

//=========================== start of change =============================

	var a = this.incrementPaySlipAn(adviceNumbers)
		.then(this.findPaySlipInAN)
		.then(this.addAN);
	
	var b = this.findBIRInMeta(metadata)
		.then(this.getHash);

	var c = this.findEmployee(Employees, eID)
		.then(this.findBIR);

	var d = this.findEmployee(Employees, eID)
		.then((employee) => {
			return PhilHealth.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}})
		});

	var e = this.findEmployee(Employees, eID)
		.then(employee => {
			return SSS.findOne({"range.to": {$gte: employee.salary}, "range.from": {$lte: employee.salary}});
		});

	var f = this.findEmployee(Employees, eID);

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
	});
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
		currentAdviceNumber = doc.number + 1;
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

exports.remove = function(req, res, callBack){
	var db = req.db;
	var paySlip = db.get('paySlip');
	var Employees = db.get('Employees');
	var arr = [];
	for(var i = 0; i < req.body.length; i++){
		arr.push(req.body[i]);
	}

	console.log('arr', req.body.length);

	paySlip.remove({adviceNumber: {$in: arr}}, function(err, num){
		if(err){
			return callBack(err);
		}
		return callBack(0, num);
	});
}

exports.viewAll = function(req, res, callBack){
	var db = req.db;
	var paySlip = db.get('paySlip');
	var Employees = db.get('Employees');

	var data = paySlip.findOne({adviceNumber: req.body[0]})
	.then((data) => {
		return data;
	});

	var employeeData = paySlip.findOne({adviceNumber: req.body[0]})
	.then((data) => {
		return Employees.findOne({eID: data.eID}).then(doc => {
			return doc;
		});
	});

	Promise.all([data, employeeData]).then(values => {
		callBack(0, values);
	})

}