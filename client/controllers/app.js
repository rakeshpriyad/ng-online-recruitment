var OnlineRecApp = angular.module('onlineRecApp', [])

OnlineRecApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/listCompanies", {controller: CompanyListController,   templateUrl : '/views/listCompanies.html'
    })
    .when("/addCompany", {
        templateUrl : '/views/addCompany.html'
    })
    .when("/editCompany/:id", {controller:EditCompanyController,
        templateUrl : '/views/editCompany.html'
    })
    /*.when("/deleteCompany/:id", {
        templateUrl : '/views/deleteCompany.html'
    })*/
    .when("/listCandidates", {controller:CandidateListController,     templateUrl : '/views/listCandidates.html'
    })
    .when("/addCandidate", {
        templateUrl : '/views/addCandidate.html'
    })
    .when("/editCandidate/:id", {controller:EditCandidateController,
        templateUrl : '/views/editCandidate.html'
    })
    .when("/listSchedules", {controller:ScheduleListController,
        templateUrl : '/views/listSchedules.html'
    })
    .when("/addSchedule", {
        templateUrl : '/views/addSchedule.html'
    })
    .when("/editSchedule/:id", {controller:EditScheduleController,
        templateUrl : '/views/editSchedule.html'
    })
    .when("/upload", {controller:CVUploadController,
        templateUrl : '/upload_cv.html'
    })
    .when("/Login", {controller: CompanyListController,   templateUrl : '/login.html'
    })
    .when("/SignUp", {controller: CompanyListController,   templateUrl : '/SignUp.html'
    })
})


