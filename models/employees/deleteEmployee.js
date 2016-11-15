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