var myApp = angular.module("feedthedevs", ["ngResource", "ngRoute"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/changelog.html', controller: ChangeLogListCtrl}).
            otherwise({redirectTo: '/'});
    }]);

