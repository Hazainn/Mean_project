var myBlog = angular.module('Blog',['ngRoute']);

var basePath = 'http://localhost:3000'

myBlog.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/index.html',
			//controller:	'dashboardCrtl'
		})
		.when('/articles',{
			templateUrl: '/views/articles.html',
			//controller:	'dashboardCrtl'
		})
		.when('/users',{
			templateUrl: '/views/users.html',
			controller:	'users'
		})
		.when('/inscription',{
			templateUrl: '/views/inscription.html'
		})
		.when('/addUser',{
			templateUrl: '/views/inscription.html',
			controller:	'users'
		})
});

myBlog.controller('users', function($scope, $http) {

	$http.get(basePath + '/users/user')
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
            console.log("User created.");
	        $location.path('#/')
          	})
          	.error(function(data){
            console.log('Unable to create user ...');
	        });
	};

		/* ng-click pour la suppression d'un user */
	$scope.deleteUser = function(email){
    	$http.delete( basePath + '/users/' + email)
    		.success(function(data){
            console.log("User deleted.");
          	})
          	.error(function(data){
            console.log('Unable to delete user ...');
	        });
	};
});