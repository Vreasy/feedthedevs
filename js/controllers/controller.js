var ChangeLogListCtrl = function ($scope, $location , CookieManager, $filter, WebServiceAPI, $q, $rootScope) {

    $rootScope.loggedIn = true;
    $scope.token = CookieManager.getAuthToken();
    if (!$scope.token) {
        $location.path("/login");
    }
    $scope.actors = [];
    $scope.events = [];
    $scope.page = 1;

    $scope.showLoader = true;
    $scope.errorLoading = false;

    $scope.loadEvents = function() {
        $scope.showPanelLoader = true;
        var param = { gitlogin : CookieManager.getGitLogin(), org: "Fitivity", pageno : $scope.page };
        //store new actors and parse events from the gi ub api
        WebServiceAPI.search(SERVER_URL + "/events", param , function(data, status) {
            $scope.events = data;

            //get saved actors
            WebServiceAPI.query(SERVER_URL + "/actors", function(data, status) {
                $scope.actors = data;

                //add actor reference to each event
                for (var i =0 ; i < $scope.events.length; i++) {
                    var actorIndex = $filter("getIndexById")($scope.actors, $scope.events[i].actor.id);
                    $scope.events[i].actor = $scope.actors[actorIndex];
                }
                $scope.showLoader = false;
                $scope.showPanelLoader = false;

            }, function() {
                $scope.errorLoading = true;
            })
        }, function() {
            $scope.errorLoading = true;
        })
    }

    $scope.nextPage = function() {
        $scope.page++;
        $scope.loadEvents();
    }

    $scope.previousPage = function() {
        if ($scope.page != 1) {
            $scope.page--;
            $scope.loadEvents();
        }
    }

    $scope.loadEvents();

    $rootScope.logout = function() {

        WebServiceAPI.post(SERVER_URL + "/logout", {token : CookieManager.getAuthToken(), gitlogin : CookieManager.getGitLogin()} ,
                            "",function() {
                CookieManager.removeKeys();
                $location.path("/login");
         }, function() {
                alert("Error logging out.")
         });

    }

};

var LoginCtrl = function ($scope, $location , CookieManager, WebServiceAPI, $rootScope) {

    $scope.showLoginBox = false;
    $rootScope.loggedIn = false;

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
                CookieManager.setGitLogin($scope.login.username);
                $rootScope.loggedIn = true;
                $location.path("/changelog");
            } else {
                $scope.errorMessage = data.errorMessage;
            }
        }, function(error) {
            $scope.errorMessage = "Error while communicating with the server";
        })
    }
}


