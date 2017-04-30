OnlineRecApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(input == undefined){
            return input;
        }
        if(input.length == undefined){
            return input;
        }
        return input.slice(start);
    }
});


OnlineRecApp.filter('roundup', function () {
        return function (value) {
            return Math.ceil(value);
        };
    })