

	
function getUsersProvider(){
	var mongoServer = 'localhost';
	var mongoPort = 27017;
	var LoginProvider = require('./daos/loginProvider').LoginProvider;
	var loginProvider = new LoginProvider(mongoServer, mongoPort);
	return loginProvider;
}

var usersProvider =  getUsersProvider();
/*
 * GET userss listing.
 */
exports.list = function(req, res){
	usersProvider.fetchTotalUserss(function(error, userss) {
		res.send(userss);
	});
	
};



exports.get = function(req, res){
		usersProvider.fetchUsersById(req.params.id, function(error, users) {
			if (users == null) {
				res.send(error, 404);
			} else {
				res.send(users);
			}
		});
	};
exports.find = function(req, res){
		var input = JSON.parse(JSON.stringify(req.body));
		
		console.log(req.body);
		console.log(req.params.page);
		var search_param = input.users_name;
		var currentPage = req.params.page;
		if ( typeof currentPage == 'undefined' )  {
			currentPage =1;
		}
		if(req.params.users_name){
				search_param = req.params.users_name;
		}
		usersProvider.fetchTotalUserss(function(error, userss) {
			totalUserss = userss.length;
		});
			usersProvider.fetchUsersByName(search_param,currentPage, function(error, userss) {
				if (userss == null) {
					res.send(error, 404);
				} else {
					var totalUserss = userss.length;
					pageCount = parseInt(totalUserss)/parseInt(pageSize);
					res.render('userss',{page_title:"User Information",data:userss,shed_name:search_param,pageSize: pageSize,	totalUserss: totalUserss,pageCount: pageCount,currentPage: currentPage});
				}
			});

};

exports.edit = function(req, res){

    var id = req.params.id;
	usersProvider.fetchUsersById(req.params.id, function(error, users) {
				res.render('edit_users',{page_title:"Edit Userss ",users});
		});
};

/*Save the users*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
		console.log('posting users');
		console.log(req.body);
		usersProvider.insertUser(req.body, function(error, users) {
			if (error) {
				res.send(error, 500);
			} else {
			   res.redirect('/#/listUserss');
			}
		});
};

exports.login = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
		console.log('posting users');
		console.log(req.body);
		usersProvider.login(req.body, function(error, users) {
			if (error) {
				res.send(error, 500);
			} else {
			   res.redirect('/online-recruitment.html');
			}
		});
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
		var id = req.params.id;
		var userss = {
            _id     		 : id,
            users_name    : input.users_name,
            address 		 : input.address,
            company_name     : input.company_name,
            candidate_name   : input.candidate_name,
			contact_person   : input.contact_person

        };
		console.log("Update Updating : %s ",id);
		console.log("Update Updating : %s ",input.users_name);

			usersProvider.updateUsers(userss, function(error, cs) {
				console.log(" Updating : %s ",JSON.stringify(req.body));
				if (error)
					console.log("Error Updating : %s ",err );
				res.send(200);
			});
};

exports.delete_users = function(req,res){
     usersProvider.deleteUsers(req.params.id, function(error, userss) {
			if (error) {
				res.send(error, 404);
			} else {
				res.redirect('/#listUserss');
			}
		});
};
