var bcrypt = require('bcrypt');

exports.login = function(req, res, callBack) {
	var db = req.db;
	var users = db.get('Users');
	var username = req.body.username;
	var password = req.body.password;
	sess = req.session;

	users.findOne({"username": username}, function(err,	user){
		if(!user){
			callBack(0);
		}
		else{
			if(bcrypt.compareSync(password, user.password)){
			// if(password == user.password){
				sess.username = user.username;
				sess.rights = user.rights;
				callBack(1);
			}
			else{
				callBack(0);
			}
		}
	});
}

exports.logout = function(req, res, callBack){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else{
			callBack();
		}
	});
}

exports.addUser = function(req, res, callBack){
	var db = req.db;
	var users = db.get('Users');
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var repass = req.body.repass;

	var hash = bcrypt.hashSync(password, 10);

	users.findOne({"username": username}, function(err, doc){
		if(doc){
			return callBack(0);
		}
		if(username && password && repass && password == repass){
			users.insert({
				"username": username,
				"password": hash,
				"email": email,
				"rights": "user"
			});
		}
		callBack(1);
	});
}

exports.getUsers = function(req, res, callBack){
	var db = req.db;
	var users = db.get('Users');

	users.find({}, function(err, doc){
		if(err) return callBack(err);
		callBack(null, doc);
	});
}

exports.deleteUser = function(req, res, callBack){
	var db = req.db;
	var users = db.get('Users');
	var username = req.body.username;

	users.remove({"username": username}, callBack(1));
}