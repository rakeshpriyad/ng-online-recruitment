
function CompanyListController ($scope, $http)
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


    $http.get('/companies').
        success(
            function(data, status, headers, config)
            {

                $scope.companies = data.slice($scope.offset*$scope.limit, $scope.offset*$scope.limit + $scope.limit);

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

        $http.get('/companies').
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

                $scope.companies = data.slice($scope.offset*$scope.limit, end);


           });

      }


  $scope.hasPic = function()
    {
        if ($scope.wine.picture == undefined)
        {
            return false;
        }

        if( $scope.wine.picture != "")
        {
             return true ;
        }

    }


}


function CompanyCreateController($scope, $http,$location) {

    var companies =
    {
        company_name: "",
        address: "",
        email: "",
        phone: "",
        contact_person: ""
    }

     var picfile =
    {
        data: ""
    }


    $scope.companies = companies;
    $scope.action = "Add" ;

    $scope.save = function()
    {
       

          $http.post('/companies/add', $scope.companies).
          success(
            function(data) {
            $location.path('/route#/listCompanies');
        });
    }
}

function EditController($scope, $http,$location,$routeParams) {

    var wine =
    {
        name: "",
        year: "",
        grapes: "",
        country: "",
        region: "",
        description: "",
        picture: ""
    }

    var picfile =
    {
        data: ""
    }

    $scope.wine = wine;
    $scope.action = "Edit" ;

    console.log ( " ID of the wine is " + $routeParams.id) ;


    $http.get('/wines/' + $routeParams.id).
    success(
    function(data, status, headers, config) {
       $scope.wine = data;
    });


    $scope.save = function()
    {

         $http.put('/wines/edit/' + $routeParams.id, $scope.wine).
          success(
            function(data) {
            $location.path('/');
        });
    }

    $scope.hasPic = function()
    {
      if ($scope.wine == undefined){
        return false;
      }else{
        if ($scope.wine.picture == undefined)
        {
            return false;
        }

        if( $scope.wine.picture != "")
        {
             return true ;
        }
      }  

    }


    $scope.$on("fileSelected", function (event, args)
                             {

                                 $scope.wine.picture =  args.file.name;

                                $scope.picture =  args.file;

                             }
            );



}
