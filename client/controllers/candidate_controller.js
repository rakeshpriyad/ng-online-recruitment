
function CandidateListController ($scope, $http)
{

 //for pagination and searching

        if ( $scope.limit == undefined )
        {
            $scope.limit = 5 ;
        }
        if ( $scope.offset == undefined )
        {
            $scope.offset = 0 ;
        }


    $http.get('/candidates').
        success(
            function(data, status, headers, config)
            {

                $scope.candidates = data;//data.slice($scope.offset*$scope.limit, $scope.offset*$scope.limit + $scope.limit);

                if ( $scope.total == undefined )
                {
                   $scope.total = data.length ;
                }

                if ( $scope.pageCount == undefined )
                {
                    $scope.pageCount = Math.floor($scope.total / $scope.limit)

                    if ($scope.total % $scope.limit !== 0)
                    {
                        $scope.pageCount += 1 ;
                    }
                }

    });


$http.get('/download').
        success(
            function(data, status, headers, config)
            {
                $scope.dir = data;
    });




$scope.loadPage = function (pg)
    {

     //for pagination and searching

        if ( $scope.limit == undefined )
        {
            $scope.limit = 5 ;
        }

        $scope.offset = pg - 1;

        $http.get('/candidates').
            success(
            function(data, status, headers, config)
            {

                var end = $scope.offset*$scope.limit + $scope.limit ;

                console.log("The end is " + end ) ;

                if ( end >  $scope.total )
                {
                    end = $scope.total ;
                }

                console.log("The end2 is " + end ) ;

                $scope.candidates = data.slice($scope.offset*$scope.limit, end);


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
            $location.url('http://localhost:4300/#/listCandidates');
        });
    }

    
}