exports.insert = function(req, res, callBack){
	var db = req.db;
	var pettyCash = db.get('pettyCash');
	var adviceNumbers = db.get('adviceNumbers');
	var name = req.body.name;
	var date = req.body.date;
	var amount = req.body.amount;
	var particulars = req.body.particulars;
	var qty = req.body.qty;

	var issuedBy = req.session.username;

	var currentAdviceNumber;

	console.log("qty", qty);
	
	var items = [];

	//remodel data
	if(particulars.constructor === Array){
		for(i=0; i < particulars.length; i++){
			items.push([particulars[i], parseFloat(amount[i]), parseFloat(qty[i])]);
		}
	}
	else{
		items.push([particulars, parseFloat(amount), parseFloat(qty)]);
	}
	console.log("items", items);

	adviceNumbers.findOne({"name": "pettyCash"}, function (err, doc) {
		currentAdviceNumber = doc.number;
		adviceNumbers.update({"name": "pettyCash"}, {$inc:{"number": 1}});
		pettyCash.insert({
			"adviceNumber": currentAdviceNumber,
			"issuedBy": issuedBy,
			"name": name,
			"date": new Date(date),
			"items": items
		});
	});
	callBack();
}

exports.view = function(req, res, callBack){
	var db = req.db;
	var pettyCash = db.get('pettyCash');
	var adviceNumbers = db.get('adviceNumbers');

	pettyCash.find({},function(err, docs){
		if(err) return callBack(err);
		callBack(null, docs);
	});
}

exports.get = function(req, callBack){
	var db = req.db;
	var adviceNumbers = db.get('adviceNumbers');

	adviceNumbers.find({"name": "pettyCash"}, function(err1, an){
		if(err1) return callBack(err1);
		callBack(null, an);
	});
}

exports.remove = function(req, res, callBack){
	var db = req.db;
	var pettyCash = db.get('pettyCash');
	var Employees = db.get('Employees');
	var arr = [];
	for(var i = 0; i < req.body.length; i++){
		arr.push(req.body[i]);
	}

	console.log('arr', req.body.length);

	pettyCash.remove({adviceNumber: {$in: arr}}, function(err, num){
		if(err){
			return callBack(err);
		}
		return callBack(0, num);
	});
}