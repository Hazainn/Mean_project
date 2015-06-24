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
			templateUrl: '/views/inscription.html',
			//controller:	'dashboardCrtl'
		})
});

myBlog.controller('users', function($scope, $http) {
	$scope.username = 'World';

	$http.get(basePath + '/users/userlist')
        .success(function (data) {
            $scope.users = data;
        })
        .error(function (data, status) {
            console.log(data);
        });

    
});