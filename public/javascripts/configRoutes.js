var myBlog = angular.module('Blog',['ngRoute']);

var basePath = 'http://localhost:3000';

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
		.when('/subscribe',{
			templateUrl: '/views/subscribe.html'
		})
});

myBlog.controller('users', function($scope, $http, $window) {

    /* Controller pour les users */

	$http.get(basePath + '/users')
        .success(function (data) {
            $scope.users = data;
        })
        .error(function (data, status) {
            console.log(data);
        });

        /* ng-click pour l'ajout d'un user */
    $scope.addUser = function(){
        if ($scope.firstname && $scope.lastname && $scope.email && $scope.password && $scope.gender) {
    	   $http.post( basePath + '/users/user',
               {
                 "Firstname":$scope.firstname,
                 "Lastname"	:$scope.lastname,
                 "email"	:$scope.email,
                 "password"	:$scope.password,
                 "gender"	:$scope.gender,
                 "role"		: {
                 	"role1": "user"
                 }
                })
    	   	.success(function(data){
                $window.alert("User created.");
                $window.location.href = '#/users/user/' + $scope.email;
              	})
              	.error(function(data){
                $window.alert('Unable to create user ...');
                $window.location.href = '#/subscribe';
	           });
        }

	};

		/* repeatClick pour la suppression d'un user */
	$scope.deleteUser = function(user, $repeatScope){

    	$http.delete( basePath + '/users/user/' + user.email)
    		.success(function(data){
            $window.alert("User deleted.");
          	})
          	.error(function(data){
            $window.alert('Unable to delete user ...');
	        });
	};
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

    /* Controller pour les articles */

myBlog.controller('article', function($scope, $http, $window) {

    $http.get(basePath + '/articles')
        .success(function (data) {
            $scope.articles = data;
        })
        .error(function (data, status) {
            console.log(data);
        });

        /* ng-click pour ajouter un article*/
    $scope.addArticle = function(){

        $scope.date = new Date();
        if ($scope.title && $scope.content) {
            $http.post( basePath + '/articles/article',
               {
                    "id_user"   : "?",
                    "firstname" :"Aoubid",
                    "lastname"  :"Hassan", 
                    "title"     :$scope.title,
                    "content"   :$scope.content,
                    "nb_com"    : 0,
                    "dates"     : {
                       
                       "created": $scope.date
                    
                    },
                    "comment"   : [{
    
                    }]
                })
            .success(function(data){
                $window.alert("article created.");
            })
            .error(function(data){
                $window.alert('Unable to create article ...');
            });
        }
        else {
           $window.alert('Unable to create article... Missing argument'); 
        }
};
});