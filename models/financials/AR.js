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

exports.view = function(req, res, callBack){
	var db = req.db;
	var AR = db.get('AR');

	AR.find({},function(err, docs){
		if(err) return callBack(err);
		callBack(null, docs);
	});
}

exports.get = function(req, callBack){
	var db = req.db;
	var adviceNumbers = db.get('adviceNumbers');

	adviceNumbers.find({"name": "AR"}, function(err1, an){
		if(err1) return callBack(err1);
		callBack(null, an);
	});
}

exports.remove = function(req, res, callBack){
	var db = req.db;
	var AR = db.get('AR');
	var Employees = db.get('Employees');
	var arr = [];
	for(var i = 0; i < req.body.length; i++){
		arr.push(req.body[i]);
	}

	console.log('arr', req.body.length);

	AR.remove({adviceNumber: {$in: arr}}, function(err, num){
		if(err){
			return callBack(err);
		}
		return callBack(0, num);
	});
}