var candidatesTable = 'candidates';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

CandidateProvider = function(host, port) {

	this.db = new Db('candidates', new Server(host, port));
	this.db.open(function(){});
	this.fetchAllCandidates = function(page,cb) {
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {
				candidates.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};

	this.fetchCandidateById = function(id, cb) {
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {
				candidates.findOne({
					_id:candidates.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};

	this.fetchCandidateByName = function(candidate_name,page, cb) {
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {

				candidates.find({"candidate_name":candidate_name}).toArray(function(error, results) {
					cb(error, results);
				});

			}
		});
	};

	this.insertCandidate = function(candidate, cb) {
		console.log('inserting candidate: ' + candidate);
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {
				candidates.insert([candidate], function() {
					cb(null, candidate);
				});
			}
		});
	};

	this.updateCandidate = function(candidate, cb) {
		console.log('updateCandidate'+candidate._id);
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {
				candidates.update({_id:candidates.db.bson_serializer.ObjectID.createFromHexString(candidate._id)},
					{           
						candidate_name    : candidate.candidate_name,
						qualification	  : candidate.qualification,
						skills			  : candidate.skills,
						address 		  : candidate.address,
						email   		  : candidate.email,
						phone   		  : candidate.phone,
						contact_person    : candidate.contact_person

					},function(error, result) {
						cb(error, result);
				});
			}
		});
	};

	this.deleteCandidate = function(id, cb) {
		this.db.collection(candidatesTable, function(error, candidates) {
			if (error) {
				cb(error, null);
			} else {
				candidates.remove({_id:candidates.db.bson_serializer.ObjectID.createFromHexString(id)},
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.CandidateProvider = CandidateProvider;
