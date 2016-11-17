exports.get = function(req, callBack) {
	var db = req.db;
	Employees = db.get('Employees');

	Employees.find({}, function(err, doc){
		if(err) return callBack(err);
		callBack(null, doc);
	});
}