myApp.directive('changelog', function() {
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
                scope.event.pizza = true;
            }

            scope.addTomato = function() {
                scope.event.actor.tomatoes++;
                scope.event.tomato = true;
            }

            scope.removePizza = function() {
                scope.event.actor.pizzas--;
                scope.event.pizza = false;
            }

            scope.removeTomato = function() {
                scope.event.actor.tomatoes--;
                scope.event.tomato = false;
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