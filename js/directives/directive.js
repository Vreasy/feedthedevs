myApp.directive('changelog', function(WebServiceAPI) {
    return {
        restrict: 'E',
        scope: {
            event : "=",
            ismouseover:"=",
            error:"="
        },
        templateUrl: 'partials/changelog-directive.html',
        link: function(scope, element) {

            scope.addPizza = function() {
                scope.event.actor.pizzas++;
                scope.showLoader = true;
                scope.rate_event(scope.event, "pizza", function(){
                    scope.event.fed_With = "pizza";
                    scope.showLoader = false;
                });
            }

            scope.addTomato = function() {
                scope.event.actor.tomatoes++;
                scope.showLoader = true;
                scope.rate_event(scope.event, "tomato", function(){
                    scope.event.fed_With = "tomato";
                    scope.showLoader = false;
                });
            }

            scope.removePizza = function() {
                scope.event.actor.pizzas--;
                scope.showLoader = true;
                scope.rate_event(scope.event, "-pizza", function(){
                    scope.event.fed_With = "";
                    scope.showLoader = false;
                });
            }

            scope.removeTomato = function() {
                scope.event.actor.tomatoes--;
                scope.showLoader = true;
                scope.rate_event(scope.event, "-tomato", function(){
                    scope.event.fed_With = "";
                    scope.showLoader = false;
                });

            }

            scope.rate_event = function(event, feed_with, successCallback, errorCallback) {
                var para = {event_id : event.id, feed_with : feed_with, actor_id : event.actor.id};
                WebServiceAPI.post(SERVER_URL + "/rate_event", para, "",
                    successCallback, function(error) {
                        scope.error = error;
                    });
            }

            scope.getDaysAgo = function() {
                var created_at = new Date(scope.event.created_at);
                var today = new Date();
                var diff = Math.round((today - created_at)/(1000*60*60*24),0);
                return (diff != undefined)?diff:0;
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