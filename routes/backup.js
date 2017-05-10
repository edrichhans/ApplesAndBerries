var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var addEmployeeRoute = require('../models/employees/addEmployee');

router.get('/', function(req, res){
	res.render('backupMenu', {title: 'Backup Menu'});
});

router.get('/backupNow', function(req, res){
	res.render('backupNow', {title: 'Local or Cloud Backup'});
});

router.get('/backupSettings', function(req, res){
	res.render('backupSettings', {title: 'Modify Backup Frequency'});
});

/* local backup now. */
router.get('/localbackup', function(req, res){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/localbackup.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	return;
});

/* cloud backup now. */
router.get('/cloudbackup', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/cloudbackup.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	return;
});

router.get('/sethourlylocal', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/hourlybackuplocal.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/sethourlycloud', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/hourlybackupcloud.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setdailylocal', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/dailybackuplocal.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setdailycloud', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/dailybackupcloud.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setweeklylocal', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/weeklybackuplocal.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setweeklycloud', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/weeklybackupcloud.bat"', function(error, stdout, stderr) {
		if (error) {
			console.error(`exec error: ${error}`);
			res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setmonthlylocal', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/monthlybackuplocal.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/setmonthlycloud', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/monthlybackupcloud.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/deletelocalbackup', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/deletelocalbackup.bat"', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/deletecloudbackup', function(req, res, next){
	child_process.exec('"C:/Users/AF/Documents/CS Subjects/CS 192/Project/Backup_Bat _Files/deletecloudbackup.bat"', function(error, stdout, stderr) {
		if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

router.get('/restore', function(req,res){
	res.render('restore', {title: 'Restore A Backup File'});
});

router.all('/restorer', function(req, res){
	
	// var month = req.body.month;
	// var day = req.body.day;
	// var year = req.body.year;
	// var hour = req.body.hour;
	// var minute = req.body.minute;
	// var second = req.body.second;

	// if (parseInt(month) < 10){
	// 	month = '0'+month
	// }

	// if (parseInt(day) < 10){
	// 	day = '0'+day
	// }

	// if (parseInt(minute) < 10){
	// 	minute = '0'+minute
	// }

	// if (parseInt(second) < 10){
	// 	second = '0'+second
	// }

	// if (month == null || day == null || year == null || hour == null || minute == null || second == null){
	// 	return res.status(500)
	// }
	// else{
		var spawn = require('child_process').spawn;
		// var filename = 'C:/MongoBackup/Date_'+month+'-'+day+'-'+year+'_Time_'+hour+'-'+minute;
		var bufile = 'C:/MongoBackup/' + req.body.filename;
		console.log(bufile);
		var args = [bufile, '--gzip'];
		mongorestore = spawn('C:/Program Files/MongoDB/Server/3.4/bin/mongorestore', args);
		
		mongorestore.stdout.on('data', function (data) {
	      console.log('stdout: ' + data);
	    });
	    mongorestore.stderr.on('data', function (data) {
	      console.log('stderr: ' + data);
	    });

		mongorestore.on('exit', function (code){
			console.log('mongorestore status code ' + code);
		});
	// }
	res.redirect("/");
});

module.exports = router;
