var express = require('express');
var router = express.Router();
var child_process = require('child_process');

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
	res.redirect("/");
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
	res.redirect("/");
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
});

module.exports = router;
