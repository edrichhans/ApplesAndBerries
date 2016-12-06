exports.insert = function(req, res, callBack){
	var db = req.db;
	var pettyCash = db.get('pettyCash');
	var adviceNumbers = db.get('adviceNumbers');
	var name = req.body.name;
	var date = req.body.date;
	var amount = req.body.amount;
	var particulars = req.body.particulars;

	var issuedBy = req.session.username;

	var currentAdviceNumber;

	var items = [];

	//remodel data
	if(particulars.constructor === Array){
		for(i=0; i < particulars.length; i++){
			items.push([particulars[i], parseFloat(amount[i])]);
		}
	}
	else{
		items.push([particulars, parseFloat(amount)]);
	}

	adviceNumbers.findOne({"name": "pettyCash"}, function (err, doc) {
		currentAdviceNumber = doc.number;
		adviceNumbers.update({"name": "pettyCash"}, {$inc:{"number": 1}});
		pettyCash.insert({
			"adviceNumber": currentAdviceNumber,
			"issuedBy": issuedBy,
			"name": name,
			"date": date,
			"items": items
		});
	});
	callBack();
}

exports.view = function(req, res, callBack){
	var db = req.db;
	var pettyCash = db.get('pettyCash');

	pettyCash.find({},function(err, docs){
		if(err) return callBack(err);
		callBack(null, docs);
	});
}