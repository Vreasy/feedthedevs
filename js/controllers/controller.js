var ChangeLogListCtrl = function ($scope, $location , CookieManager, $filter, WebServiceAPI, $q) {
    // initialize static data
    $scope.token = CookieManager.getAuthToken();

    $scope.actors = [];
    $scope.events = [];

    $scope.showLoader = true;
    $scope.errorLoading = false;

    var deferActorLoad = $q.defer();
    var deferEventsLoad = $q.defer();

    WebServiceAPI.query(SERVER_URL + "/actors", function(data, status) {
        $scope.actors = data;
        deferActorLoad.resolve();
    }, function() {
        $scope.errorLoading = true;
    })

    WebServiceAPI.query(SERVER_URL + "/events", function(data, status) {
        $scope.events = data;
        deferEventsLoad.resolve();
    }, function() {
        $scope.errorLoading = true;
    })

    $q.all([deferActorLoad.promise, deferEventsLoad.promise]).then (function() {
        for (var i =0 ; i < $scope.events.length; i++) {
            var actorIndex = $filter("getIndexById")($scope.actors, $scope.events[i].actor.id);
            $scope.events[i].actor = $scope.actors[actorIndex];
        }
        $scope.showLoader = false;
    })
};

var LoginCtrl = function ($scope, $location , CookieManager, WebServiceAPI) {

    $scope.showLoginBox = false;

    //check if Authentication token exists
    if (CookieManager.getAuthToken()) {
        $location.path("/changelog");
    } else {
        $scope.showLoginBox = true;
    }

    $scope.signin = function() {
        var postData = { username : $scope.login.username, password : $scope.login.password } ;
        WebServiceAPI.post(SERVER_URL + "/login", postData, {} , function(data, status) {
            if (data.id != 0) {
                CookieManager.setAuthToken(data.token);
                $location.path("/changelog");
            } else {
                $scope.errorMessage = data.errorMessage;
            }
        }, function(error) {
            $scope.errorMessage = "Error while communicating with the server";
        })
    }
}


