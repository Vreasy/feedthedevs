myApp.directive('changelog', function(WebServiceAPI) {
    return {
        restrict: 'E',
        scope: {
            event : "=",
            ismouseover:"="
        },
        templateUrl: 'partials/changelog-directive.html',
        link: function(scope, element) {

            scope.addPizza = function() {
                scope.event.actor.pizzas++;
                scope.showLoader = true;
                scope.rate_event(scope.event, "pizza", function(){
                    scope.event.fed_With = "pizza";
                    scope.showLoader = false;
                } , function() {  });
            }

            scope.addTomato = function() {
                scope.event.actor.tomatoes++;
                scope.showLoader = true;
                scope.rate_event(scope.event, "tomato", function(){
                    scope.event.fed_With = "tomato";
                    scope.showLoader = false;
                } , function() {  });
            }

            scope.removePizza = function() {
                scope.event.actor.pizzas--;
                scope.showLoader = true;
                scope.rate_event(scope.event, "-pizza", function(){
                    scope.event.fed_With = "";
                    scope.showLoader = false;
                } , function() {  });
            }

            scope.removeTomato = function() {
                scope.event.actor.tomatoes--;
                scope.showLoader = true;
                scope.rate_event(scope.event, "-tomato", function(){
                    scope.event.fed_With = "";
                    scope.showLoader = false;
                } , function() {  });

            }

            scope.rate_event = function(event, feed_with, successCallback, errorCallback) {
                var para = {event_id : event.id, feed_with : feed_with, actor_id : event.actor.id};
                WebServiceAPI.post(SERVER_URL + "/rate_event", para, "",
                    successCallback, errorCallback);
            }
        }
    };
});

myApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
//                    if(attrs.ngClick){
//                        scope.$eval(attrs.ngClick);
//                    }
                });
            }
        }
    };
});