exports.get = function(req, callBack){
	var db = req.db;
	var metadata = db.get("metadata");

	metadata.findOne({"name": "Particulars"}, function(err, doc){
		if(err) return callBack(err);
		callBack(null, doc);
	});
}

exports.insert = function(req, res, callBack){
	var db = req.db;
	var checkVoucher = db.get('checkVoucher');
	var adviceNumbers = db.get('adviceNumbers');
	var name = req.body.name;
	var date = req.body.date;
	var amount = req.body.amount;
	var particulars = req.body.particulars;

	var issuedBy = req.session.username;

	var currentAdviceNumber;

	adviceNumbers.findOne({"name": "checkVoucher"}, function (err, doc) {
		currentAdviceNumber = doc.number;
		adviceNumbers.update({"name": "checkVoucher"}, {$inc:{"number": 1}});
		checkVoucher.insert({
			"adviceNumber": currentAdviceNumber,
			"issuedBy": issuedBy,
			"name": name,
			"date": date,
			"amount": amount,
			"particulars": particulars
		}, callBack());
	});
}
