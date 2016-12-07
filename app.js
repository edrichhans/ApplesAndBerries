var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var monk = require('monk');
var spawn = require('child_process').spawn;
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/ApplesAndBerries');
// var url = 'mongodb://' + process.env.MONGOLAB_URI || 'mongodb://localhost:27017/POS';

var financials = require('./routes/financials');
var employees = require('./routes/employees');
var login = require('./routes/login');

var app = express();
var MongoClient = mongo.MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(session({secret: 'shhhhh'}));

app.use(function(req, res, next){
	req.db = db;
	next();
});
app.get(['/controlpanel', '/BIR', '/SSS', 'PH'], function(req, res, next){
	sess = req.session;
	if(sess.rights == 'admin'){
		next();
	}
	else{
		res.redirect('/');
	}
});

app.use('/', login);
app.use('/', financials);
app.use('/employees', employees);


app.get('/', function(req, res, next) {
	res.render('index', { title: 'Apples and Berries Payroll System' });
});

app.get('/controlpanel', function(req, res, next){
	res.render('controlpanel', {title: 'Apples and Berries Payroll System'});
});

app.get('/backup', function(req, res, next){
	var args = ['--db', 'ApplesAndBerries', '-o', 'backup']
		, mongodump = spawn('mongodump', args);
	mongodump.stdout.on('data', (data) => {
		console.log('stdout: ' + data);
	});
	mongodump.stderr.on('data', (data) => {
		console.log('stderr: ' + data);
	});
	mongodump.on('exit', (code) => {
		console.log('mongodump exited with code ' + code);
	});
	res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
					message: err.message,
					error: err
			});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
			message: err.message,
			error: {}
	});
});


module.exports = app;
