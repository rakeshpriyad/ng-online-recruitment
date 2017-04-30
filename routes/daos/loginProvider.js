var usersTable = 'users';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

LoginProvider = function(host, port) {

	this.db = new Db('users', new Server(host, port));
	this.db.open(function(){});
	this.fetchAllUsers = function(page,cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};

	this.fetchTotalUsers = function(cb) {
		
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};

	this.fetchUsersById = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};

	this.fetchUsersByName = function(users_name,page, cb) {

		
		if(page > 1){
			skipSize= pageSize*(page-1);
		}
		this.db.collection(usersTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {

				candidates.find({"users_name":users_name}).skip(skipSize).limit(pageSize).toArray(function(error, results) {
					cb(error, results);
				});

			}
		});
	};

	this.insertUser = function(user, cb) {
		console.log('inserting user: ' + user);
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.insert([user], function() {
					cb(null, user);
				});
			}
		});
	};

	this.updateUsers = function(users, cb) {
		console.log('updateUsers'+users._id);
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.update({_id:users.db.bson_serializer.ObjectID.createFromHexString(users._id)},
					{users_name:users.users_name, address:users.address, company_name:users.company_name,candidate_name:users.candidate_name,contact_person:users.contact_person},
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};

	this.login = function(user, cb) {
		console.log('updateUsers'+user.users_name);
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {

				users.find({"users_name":user.users_name,"password":user.password}).toArray(function(error, results) {
					cb(error, results);
				});

			}
		});
	};

	this.deleteUsers = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.remove({_id:users.db.bson_serializer.ObjectID.createFromHexString(id)},
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.LoginProvider = LoginProvider;
