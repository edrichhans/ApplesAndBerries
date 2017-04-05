exports.insert = function(req, res, callBack){
	var db = req.db;
	var Employees = db.get("Employees");
	var adviceNumbers = db.get("adviceNumbers");
	var name = req.body.name;
	var start = req.body.start;
	var birthday = req.body.birthday;
	var position = parseInt(req.body.position);
	var status = parseInt(req.body.status);
	var dependents = parseInt(req.body.dependents);
	var salary = parseFloat(req.body.salary);

	if(name == null || start == null || birthday == null || position == null || status == null || dependents == null || salary == null){
		console.log(name);
		return res.status(500).json({error: 500})
	}

	else{
		adviceNumbers.findOne({"name": "eID"}, function(err, doc){
			Employees.insert({
				"eID": doc.number,
				"name": name,
				"startDate": start,
				"birthday": birthday,
				"position": position,
				"status": status,
				"dependents": dependents,
				"salary": salary,
				"employed": true
			});
			adviceNumbers.update({"name": "eID"}, {$inc:{number: 1}});
		});
		callBack();
	}
}