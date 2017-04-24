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
	child_process.exec('../Backup_Bat_Files/localbackup.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/cloudbackup.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/hourlybackuplocal.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/hourlybackupcloud.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/dailybackuplocal.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/dailybackupcloud.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/weeklybackuplocal.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/weeklybackupcloud.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/monthlybackuplocal.bat', function(error, stdout, stderr) {
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
	child_process.exec('../Backup_Bat_Files/monthlybackupcloud.bat', function(error, stdout, stderr) {
    	if (error) {
		    console.error(`exec error: ${error}`);
		    res.status(500);
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
	res.redirect("/");
});

module.exports = router;