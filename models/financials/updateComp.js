exports.get = function(req, res, callBack){
	var db = req.db;
	var SSS = db.get('SSS');
	var PH = db.get('PhilHealth');

	SSS.find({}, function(err, sssdoc){
		if(err) return callBack(err);
		PH.find({}, function(err2, phdoc){
			if(err) return callBack(err2);
			callBack(null, sssdoc, phdoc);
		});
	});
}

exports.updateSSS = function(req, res, callBack){
	var db = req.db;
	var SSS = db.get('SSS');
	var body = req.body;

	for(var i = 0; i < body.length; i++){
		if(body[i]['range']['to'] === null){
			body[i]['range']['to'] = Infinity;
		}
	}

	console.log(body);

	SSS.remove({});
	SSS.insert(body,function(){
		callBack();
	});
}

exports.updatePH = function(req, res, callBack){
	var db = req.db;
	var PH = db.get('PhilHealth');
	var body = req.body;

	for(var i = 0; i < body.length; i++){
		if(body[i]['range']['to'] === null){
			body[i]['range']['to'] = Infinity;
		}
	}

	PH.remove({});
	PH.insert(body, function(){
		callBack();
	});
}