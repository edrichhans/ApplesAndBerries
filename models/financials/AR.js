exports.insert = function(req, res, callBack){
	var db = req.db;
	var AR = db.get('AR');
	var adviceNumbers = db.get('adviceNumbers');
	var name = req.body.name;
	var date = req.body.date;
	var amount = parseFloat(req.body.amount);
	var particulars = req.body.particulars;

	var issuedBy = req.session.username;

	var currentAdviceNumber;

	adviceNumbers.findOne({"name": "AR"}, function (err, doc) {
		currentAdviceNumber = doc.number;
		adviceNumbers.update({"name": "AR"}, {$inc:{"number": 1}});
		AR.insert({
			"adviceNumber": currentAdviceNumber,
			"issuedBy": issuedBy,
			"name": name,
			"date": date,
			"particulars": particulars,
			"amount": amount
		});
	});
	callBack();
}