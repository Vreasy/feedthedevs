var myApp = angular.module("feedthedevs", ["ngResource", "ngRoute"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/changelogs.html', controller: ChangeLogListCtrl}).
            otherwise({redirectTo: '/'});
    }]);

