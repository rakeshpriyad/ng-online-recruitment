
function CVUploadController ($scope, $http)
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


    $http.get('/candidates/upload').
        success(
            function(data, status, headers, config)
            {

                $scope.message = data.slice($scope.offset*$scope.limit, $scope.offset*$scope.limit + $scope.limit);

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




$scope.loadPage = function (pg)
    {

     //for pagination and searching

        if ( $scope.limit == undefined )
        {
            $scope.limit = 5 ;
        }

        $scope.offset = pg - 1;

        $http.get('/candidates/upload').
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

                $scope.message = data.slice($scope.offset*$scope.limit, end);


           });

      }

}

