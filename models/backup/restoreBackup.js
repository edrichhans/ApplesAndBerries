exports.restore = function(res, req){
	var month = req.body.month;
	var day = req.body.day;
	var year = req.body.year;
	var hour = req.body.hour;
	var minute = req.body.minute;
	var second = req.body.second;

	if (month == null || day == null || year == null || hour == null || minute == null || second == null){
		return res.status(500)
	}
	else{
		var spawn = require('child_process').spawn;
		var filename = 'C:/MongoBackup/Date_'+month+'-'+day+'-'+year+'_Time_'+hour+'-'+minute
		var args = [filename, '--gzip'];
		mongorestore = spawn('C:/Program Files/MongoDB/Server/3.4/bin/mongorestore', args);
		mongorestore.on('exit', function (code){
			console.log('mongorestore status code ' + code);
		});
	}
}