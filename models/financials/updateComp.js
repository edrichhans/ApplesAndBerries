exports.get = function(req, res, callBack){
	var db = req.db;
	var SSS = db.get('SSS');
	var PH = db.get('PhilHealth');
	var BIR = db.get('BIR');
	var metadata = db.get('metadata');

	SSS.find({}, function(err, sssdoc){
		if(err) return callBack(err);
		PH.find({}, function(err2, phdoc){
			if(err2) return callBack(err2);
			BIR.find({}, function(err3, birdoc){
				if(err3) return callBack(err3);
				metadata.find({"name": "BIR"}, function(err4, metadata){
					if(err4) return callBack(err4);
					callBack(null, sssdoc, phdoc, birdoc, metadata);
				});
			});
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

exports.updateBIR = function(req, res, callBack){
	var db = req.db;
	var BIR = db.get('BIR');
	var metadata = db.get('metadata');
	var body = req.body;

	metadata.remove({"name": "BIR"});
	BIR.remove({});

	metadata.insert(body[0]);
	BIR.insert(body[1], function(){
		callBack();
	});

	console.log(body[0]);
	console.log(body[1]);
}