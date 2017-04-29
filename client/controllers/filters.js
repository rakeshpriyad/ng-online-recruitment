OnlineRecApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(input.length == undefined){
            return input;
        }
        return input.slice(start);
    }
});