var myApp = angular.module("feedthedevs", ["ngResource", "ngRoute", "ngCookies"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
            when('/changelog', {templateUrl: 'partials/changelog.html', controller: ChangeLogListCtrl}).
            otherwise({redirectTo: '/'});
    }]);


myApp.factory("WebServiceAPI", function($http) {
    return {
        search: function(url, params, callback, errorcallback) {
            $http({
                method: 'GET',
                url: url,
                params: params
            }).success(callback).error(errorcallback);
        },
        query: function(url, callback, errorcallback) {
            $http({
                method: 'GET',
                url: url
            }).success(callback).error(errorcallback);
        },
        delete: function(url, callback, errorcallback) {
            $http({
                method: 'DELETE',
                url: url
            }).success(callback).error(errorcallback);
        },
        update: function(url, data, headers, callback, errorcallback) {
            $http({
                method: 'PUT',
                url: url,
                data: data,
                headers: headers
            }).success(callback).error(errorcallback);
        },
        post: function(url, data, headers, callback, errorcallback) {
            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            }).success(callback).error(errorcallback);
        }
    }
});

myApp.factory("CookieManager", function($cookieStore, $cookies, $http) {
    return {
        setAuthToken : function (token) {
            $http.defaults.headers.common['Authorization'] = "token " + token;
            $cookieStore.put('token', token);
        },
        getAuthToken : function() {
            var token;
            if ($cookies.token) {
                token = $cookies.token.replace(/\"/g, "");
                $http.defaults.headers.common['Authorization'] = "token " + token ;
            }
            return token;
        },
        setGitLogin : function (login) {
            $cookieStore.put('gitlogin', login);
        },
        getGitLogin : function() {
            return $cookies.gitlogin.replace(/\"/g, "");
        },
        removeKeys: function() {
            if ($cookies.gitlogin)
                $cookieStore.remove("gitlogin");
            if ($cookies.token)
                $cookieStore.remove("token");
        }

    }
})

myApp.filter('getById', function() {
    return function(input, id) {
        var i, len=input.length;
        for (i = 0; i < len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
});

myApp.filter("getIndexById", function() {
    return function(input, id) {
        var i, len=input.length;
        for (i = 0; i < len; i++) {
            if (+input[i].id == +id) {
                return i;
            }
        }
        return null;
    }
});

