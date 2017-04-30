
function CompanyListController ($scope, $http)
{

    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.data = [];
    $scope.q = '';
    var companies = {};
    $scope.companies = companies;
 
    $http.get('/companies').
        success(
            function(data, status, headers, config)
            {

                $scope.companies = data;
                $scope.numberOfPages  = Math.ceil(data.length/$scope.pageSize); 
    });

$scope.loadPage = function (pg)
    {

        $http.get('/companies').
            success(
            function(data, status, headers, config)
            {
                $scope.companies = data;
           });
      }
}

function EditCompanyController($scope, $http,$location,$routeParams) {
    var company =
    {      
            company_name    : "",
            address 		: "",
            email   		: "",
            phone   		: "",
			contact_person  : ""
    }

    $scope.company = company;
    $scope.action = "Edit" ;

    console.log ( " ID of the Companies is " + $routeParams.id) ;


    $http.get('/companies/get/' + $routeParams.id).
    success(
    function(data, status, headers, config) {
       $scope.company = data;
    });


    $scope.save = function()
    {
        $http.post('/companies/edit/' + $routeParams.id, $scope.company).
          success(
            function(data) {
            $location.url('/#/listCompanies');
        });
    }
}