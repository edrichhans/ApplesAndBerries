<<<<<<< HEAD
var crypto = require('crypto');

var genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length);	 /** return required number of characters */
};

var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	var value = hash.digest('hex');
	return {
			salt:salt,
			passwordHash:value
	};
};

function isPasswordCorrect(hash, salt, user_password){
	// console.log('LOG', hash, salt, user_password);
	return sha512(user_password, salt).passwordHash == hash;
}
=======
var bcrypt = require('bcrypt');
>>>>>>> master

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
		var a;
		if(doc){
			return callBack(0);
		}
		if(username && password && repass && password == repass){
			a = users.insert({
				"username": username,
				"password": hash,
				"email": email,
				"rights": "user"
			}).then(doc2 => {
				// console.log('DOC', doc);
				return doc2;
			});
		}
		else{
			return callBack(0);
		}
		Promise.all([a]).then(values => {
			return callBack(values[0]);
		});
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

	users.remove({"username": username}).then(doc =>{
		return callBack(doc);
	});
}