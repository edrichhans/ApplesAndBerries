exports.login = function(req, res, callBack) {
	var db = req.db;
	var users = db.get('Users');
	var username = req.body.username;
	sess = req.session;

	users.findOne({"username": username}, function(err,	user){
		if(!user){
			callBack(0);
		}
		else{
			if(req.body.password == user.password){
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
	var repass = req.body.repass;

	users.findOne({"username": username}, function(err, doc){
		if(doc){
			return callBack(0);
		}
		if(username && password && repass && password == repass){
			users.insert({
				"username": username,
				"password": password,
				"rights": "user"
			});
		}
		callBack(1);
	});
}