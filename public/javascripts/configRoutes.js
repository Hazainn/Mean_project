var myBlog = angular.module('Blog',['ngRoute', 'ui.tinymce']);

var basePath = 'http://localhost:3000'

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
		.when('/addUser',{
			templateUrl: '/views/subscribe.html',
			controller:	'users'
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

myBlog.controller('article', function($scope, $http) {

    $http.get(basePath + '/articles')
        .success(function (data) {
            $scope.articles = data;
            console.log(data);
        })
        .error(function (data, status) {
            console.log(data);
        });

    $scope.tinymceOptions = {
        onChange: function(e) {
          // put logic here for keypress and cut/paste changes
        },
        format: false,
        inline: false,
        plugins : 'advlist autolink link image lists charmap print preview',
        skin: 'lightgray',
        theme : 'modern'
    };

    $scope.genHtml = function(template){ 
        var linkFunction = $compile(template);
        var result = linkFunction($scope);
        $scope.$apply();
    
    };
        /* ng-click pour ajouter un article*/
    $scope.addArticle = function(){

        $http.post( basePath + '/articles/article',
           {
             "title"    :$scope.title,
             "content"  :$scope.tinymceModel
            })
            .success(function(data){
            console.log("User created.");
            console.log($scope.tinymceModel);
            console.log($scope.title);
            })
            .error(function(data){
            console.log('Unable to create user ...');
            });
    };

});

/*
myBlog.controller('genHtml', function() {

};

           {
             "Firstname":$scope.firstname,
             "Lastname" :$scope.lastname,
             "email"    :$scope.email,
             "password" :$scope.password,
             "gender"   :$scope.gender,
             "role"     : {
                "role1": "user"
             }
            }*/