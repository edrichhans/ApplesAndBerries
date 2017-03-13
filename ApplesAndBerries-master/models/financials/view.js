exports.viewSpecific = function(req, res, callBack) {
	var db = req.db;
	var paySlip = db.get('paySlip');
	var AR = db.get('AR');
	var checkVoucher = db.get('checkVoucher');
	var pettyCash = db.get('pettyCash');
	var Employees = db.get('Employees');
	var transaction = req.body.chooseTransaction;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;

	var table = db.get(transaction);

	table.find({},function(err, docs){
		if(err) return callBack(err);
		Employees.find({}, function(err2, people){
			if(err2) return callBack(err2);
			callBack(null, transaction, docs, people);
		});
	});
}