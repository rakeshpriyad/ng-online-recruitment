var OnlineRecApp = angular.module('onlineRecApp', [])

OnlineRecApp.config(function($routeProvider, $locationProvider) {
  $routeProvider

  /*
  	.when('/', {controller: CompanyListController, templateUrl: '/views/listCompanies.html'})
  	
  	// NewWines
    .when('/addCompany', {controller: CompanyCreateController, templateUrl: '/views/addCompany.html'})

    // EditWines
    .when('/editCompany/:id', {controller: CompanyEditController, templateUrl: '/views/editCompany.html'})

    //.when('/SelectWines', {controller: ListController, templateUrl: '/partials/SelectWine.html'})

    .otherwise({redirectTo: '/'})
    */

    .when("/listCompanies", {controller: CompanyListController,   templateUrl : '/views/listCompanies.html'
    })
    .when("/addCompany", {controller:CompanyCreateController,
        templateUrl : '/views/addCompany.html'
    })
    .when("/editCompany", {
        templateUrl : '/views/editCompany.html'
    })
    .when("/listCandidates", {controller:CandidateListController,     templateUrl : '/views/listCandidates.html'
    })
    .when("/addCandidate", {controller:CompanyCreateController,
        templateUrl : '/views/addCandidate.html'
    })
    .when("/editCandidate", {
        templateUrl : '/views/editCandidate.html'
    })
    .when("/listSchedules", {controller:ScheduleListController,
        templateUrl : '/views/listSchedules.html'
    })
    .when("/addSchedule", {controller:CompanyCreateController,
        templateUrl : '/views/addSchedule.html'
    })
    .when("/editSchedule", {
        templateUrl : '/views/editSchedule.html'
    })
})


