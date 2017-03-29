exports.insert = function(req, res, callBack){
	payslipmodel.info("Preparing database...");
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

	if(deductibles.constructor === Array){
		payslipmodel.info("Multiple deductibles found.");
		for(var i=0; i<deductibles.length;i++) deductibles[i] = parseFloat(deductibles[i]);
	}
	else{
		deductibles = [parseFloat(deductibles)];
		deductibles_name = [deductibles_name];
	}
	if(allowance.constructor === Array){
		payslipmodel.info("Multiple allowances found.");
		for(var i=0; i<allowance.length;i++) allowance[i] = parseFloat(allowance[i]);
	}
	else{
		allowance = [parseFloat(allowance)];
		allowance_name = [allowance_name];
	}

	var currentAdviceNumber;

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

	function getSum(arr){
		var result = 0;
		for(var i = 0; i < arr.length; i++){
			result += arr[i];
		}
		return result;
	}

	var hash = [];
	metadata.findOne({"name": "BIR"}, function(err, docs){
		payslipmodel.info("Storing BIR values into hash...");
		hash = docs.hash;
	});

	var jsondata;

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
	});
	callBack(jsondata);
}