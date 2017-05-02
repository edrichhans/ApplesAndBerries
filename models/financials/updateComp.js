exports.updateSSS = function(req, res, callBack){
	var db = req.db;
	var SSS = db.get('SSS');
	var body = req.body;

	for(var i = 0; i < body.length; i++){
		if(body[i]['range']['to'] === null){
			body[i]['range']['to'] = Infinity;
		}
	}

	for(var i=0; i<body.length; i++){
		if(isNaN(parseFloat(body[i].credit)) || isNaN(parseFloat(body[i].totalER)) || isNaN(parseFloat(body[i].totalEE)) || isNaN(parseFloat(body[i].total)) || isNaN(parseFloat(body[i].EC))){
			// console.log("HEREAJHSDFA");
			// console.log(body[i]);
			callBack(500);
			return;
		}
		else if(isNaN(parseFloat(body[i].range.to)) || isNaN(parseFloat(body[i].range.from))){
			// console.log("HEREAJHSDFA");
			// console.log(body[i]);
			callBack(500);
			return;
		}
	}

	// console.log(body);

	SSS.remove({});
	SSS.insert(body,function(){
		callBack();
	});

	// console.log("body");
	// console.log(body);
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

	for(var i=0; i<body.length; i++){
		if(isNaN(parseFloat(body[i].base)) || isNaN(parseFloat(body[i].premium)) || isNaN(parseFloat(body[i].share))){
			console.log('EYTPA SDFKJLANS');
			console.log(body[i].base);
			callBack(500);
			return;
		}
		if(isNaN(parseFloat(body[i].range.from)) || isNaN(parseFloat(body[i].range.to))){
			callBack(500);
			return;
		}
	}

	// console.log("body");
	// console.log(body);

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

	console.log("BODY HERE", body);

	for(var i=0;i<body[0][0].hash.length;i++){
		if(isNaN(parseFloat(body[0][0].hash[i][0]))){
			callBack(500);
			return;
		}
		if(isNaN(parseFloat(body[0][0].hash[i][1]))){
			callBack(500);
			return;
		}
	}

	for(var i=0; i<body[1].length; i++){
		for(var j=0; j<body[1][i].ranges.length; j++){
			if(isNaN(parseFloat(body[1][i].ranges[j]))){
				callBack(500);
				return;
			}
		}
	}

	metadata.remove({"name": "BIR"});
	BIR.remove({});

	metadata.insert(body[0]);
	BIR.insert(body[1], function(){
		callBack();
	});

	// console.log("body");	
	// console.log(body[0][0].hash);
	// console.log(body[1]);
}

exports.getBIR = function(req, res, callBack){
	var db = req.db;
	var BIR = db.get('BIR');
	var metadata = db.get('metadata');

	BIR.find({}, function(err3, birdoc){
		if(err3) return callBack(err3);
		metadata.find({"name": "BIR"}, function(err4, metadata){
			if(err4) return callBack(err4);
			callBack(null, birdoc, metadata);
		});
	});
}

exports.getPH = function(req, res, callBack){
	var db = req.db;
	var PH = db.get('PhilHealth');

	PH.find({}, function(err, phdoc){
		if(err) return callBack(err);
			callBack(null, phdoc);
	});
}

exports.getSSS = function(req, res, callBack){
	var db = req.db;
	var SSS = db.get('SSS');

	SSS.find({}, function(err, sssdoc){
		if(err) return callBack(err);
			callBack(null, sssdoc);
	});
}
