
function ScheduleListController ($scope, $http)
{

    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.data = [];
    $scope.q = '';
    $scope.Math = window.Math;
    


    $http.get('/schedules').
        success(
            function(data, status, headers, config)
            {

                $scope.schedules = data;
                $scope.numberOfPages  = Math.ceil(data.length/$scope.pageSize); 
    });




$scope.loadPage = function (pg)
    {

     
        $http.get('/schedules').
            success(
            function(data, status, headers, config)
            {
                $scope.schedules = data;
           });
      }
}

function EditScheduleController($scope, $http,$location,$routeParams) {

    var schedule = {schedule_name:"", address:"", company_name:"",candidate_name:"",contact_person:""};
    $scope.message = '';
    $scope.schedule = schedule;
    $scope.action = "Edit" ;

    console.log ( " ID of the schedule is " + $routeParams.id) ;


    $http.get('/schedules/get/' + $routeParams.id).
    success(
    function(data, status, headers, config) {
       $scope.schedule = data;
    });


    $scope.save = function()
    {

         $http.post('/schedules/edit/' + $routeParams.id, $scope.schedule).
          success(
            function(data) {
            //$location.url('http://localhost:4300/#/listSchedules');
            message ="Success";
        });
    }

    
}