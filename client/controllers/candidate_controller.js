
function CandidateListController ($scope, $http)
{

    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.data = [];
    $scope.q = '';

    $http.get('/candidates').
        success(
            function(data, status, headers, config)
            {

                $scope.candidates = data;
                $scope.numberOfPages  = Math.ceil(data.length/$scope.pageSize); 
    });


$http.get('/download').
        success(
            function(data, status, headers, config)
            {
                $scope.dir = data;
    });

$scope.loadPage = function (pg)
    {

        $http.get('/candidates').
            success(
            function(data, status, headers, config)
            {

                $scope.candidates = data;
           });
      }
}


function EditCandidateController($scope, $http,$location,$routeParams) {

    var candidate =
    {
        candidate_name: "",
        qualification: "",
        skills: "",
        address: "",
        email: "",
        phone: ""
    }

    var picfile =
    {
        data: ""
    }

    $scope.candidate = candidate;
    $scope.action = "Edit" ;

    console.log ( " ID of the Candidate is " + $routeParams.id) ;


    $http.get('/candidates/get/' + $routeParams.id).
    success(
    function(data, status, headers, config) {
       $scope.candidate = data;
    });


    $scope.save = function()
    {

         $http.post('/candidates/edit/' + $routeParams.id, $scope.candidate).
          success(
            function(data) {
            $location.url('/listCandidates');
        });
    }

}