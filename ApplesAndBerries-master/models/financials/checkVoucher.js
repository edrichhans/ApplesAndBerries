exports.get = function(req, callBack){
	var db = req.db;
	var metadata = db.get("metadata");
	var adviceNumbers = db.get('adviceNumbers');

	metadata.findOne({"name": "Particulars"}, function(err, doc){
		if(err) return callBack(err);
		adviceNumbers.findOne({"name": "checkVoucher"}, function(err1, an){
			if(err1) return callBack(err1);
			callBack(null, doc, an);
		});
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

exports.view = function(req, res, callBack){
	var db = req.db;
	var checkVoucher = db.get('checkVoucher');

	checkVoucher.find({},function(err, docs){
		if(err) return callBack(err);
		callBack(null, docs);
	});
}