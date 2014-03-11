var ChangeLogListCtrl = function ($scope, $location , CookieManager, WebServiceAPI) {
    // initialize static data
    $scope.users = [];

    $scope.changeLogData = [
        {
            heading : "Added a cool way to delete ALL your data with one click!",
            user : $scope.users[0],
            daysAgo:"1",
            pizza: true,
            tomato: false
        },
        {
            heading : "Added a rent paid notification on the dashboard",
            user : $scope.users[1],
            daysAgo:"10",
            pizza: false,
            tomato: false
        },
        {
            heading : "Customer Dashboard - running ticker",
            user : $scope.users[2],
            daysAgo:"21",
            pizza: false,
            tomato: true
        },
        {
            heading : "Created a new payment due report",
            user : $scope.users[1],
            daysAgo:"25",
            pizza: false,
            tomato: false
        }

    ];
    $scope.token = CookieManager.getAuthToken();

    $scope.events = [];
    WebServiceAPI.query(SERVER_URL + "/events", function(data, status) {
        $scope.events = data;
    }, function() {

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


