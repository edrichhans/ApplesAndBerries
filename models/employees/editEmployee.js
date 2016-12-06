exports.get = function(req, callBack) {
	var db = req.db;
	var Employees = db.get("Employees");

	Employees.find({}, function(err, doc){
		if(err) return callBack(err);
		callBack(null, doc);
	});
}

exports.delete = function(req, res, callBack){
	var db = req.db;
	var eID = req.body.eID
	var Employees = db.get("Employees");
	Employees.remove({"eID": parseInt(eID)}, callBack());
}

exports.getEdit = function(req, callBack){
	var db = req.db;
	var Employees = db.get("Employees");

	Employees.find({}, function(err, doc){
		if(err) return callBack(err);
		callBack(null, doc);
	});
}

exports.postEdit = function(req, res, callBack){
	var db = req.db;
	var eID = req.body.eID;
	var position = req.body.position;
	var status = req.body.status;
	var dependents = req.body.dependents;
	var salary = req.body.salary;

	var Employees = db.get("Employees");

	console.log(eID);

	Employees.update({"eID": parseInt(eID)}, {
		$set:{
			"position": position,
			"status": parseInt(status),
			"dependents": parseInt(dependents),
			"salary": parseFloat(salary)
		}
	});
	callBack();
}