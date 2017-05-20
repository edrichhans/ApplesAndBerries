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
			"startDate": new Date(startDate),
			"endDate": new Date(endDate),
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
