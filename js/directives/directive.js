myApp.directive('changelog', function() {
    return {
        restrict: 'E',
        scope: {
            log : "=",
            ismouseover:"="
        },
        templateUrl: 'partials/changelog-directive.html',
        link: function(scope, element) {

            scope.addPizza = function() {
                scope.log.user.pizzas++;
                scope.log.pizza = true;
            }

            scope.addTomato = function() {
                scope.log.user.tomatoes++;
                scope.log.tomato = true;
            }

            scope.removePizza = function() {
                scope.log.user.pizzas--;
                scope.log.pizza = false;
            }

            scope.removeTomato = function() {
                scope.log.user.tomatoes--;
                scope.log.tomato = false;
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