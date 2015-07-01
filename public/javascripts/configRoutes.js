var myBlog = angular.module('Blog',['ngRoute']);

var basePath = 'http://localhost:3000';

var userLogin = "aoubid_h@etna-alternance.net";
var userId    = "558ab5aed2b78aaede7b7c77";
var role    = "superuser";

myBlog.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/index.html',
			controller:	'article'
		})
		.when('/articles',{
			templateUrl: '/views/articles.html',
			controller:	'article'
		})
    .when('/articles/article',{
      templateUrl: '/views/addArticle.html',
      controller: 'article'
    })
		.when('/users',{
			templateUrl: '/views/users.html',
			controller:	'users'
		})
    .when('/users/user/:email',{
      templateUrl: '/views/user.html',
      controller: 'putUser'
    })
		.when('/subscribe',{
			templateUrl: '/views/subscribe.html'
		})
    .otherwise({
        redirectTo: '/'
    });
});

myBlog.directive('repeatClick', ['$parse', function($parse) {
  return {
    restrict: 'A',
    compile: function($element, attr) {
      var fn = $parse(attr['repeatClick']);
      return function(scope, element, attr) {
        element.on('click', function(event) {
          scope.$apply(function() {
            fn(scope, {$event: event, $scope: scope});
          });
        });
      };
    }
  };
}]);