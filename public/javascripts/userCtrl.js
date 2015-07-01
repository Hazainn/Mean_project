var userLogin = "aoubid_h@etna-alternance.net";
var userId    = "558ab5aed2b78aaede7b7c77";
var role      = "superuser";

        /* controlleur pour les users */

myBlog.controller('users', function($scope, $http, $window) {

    /* Controlleur pour les users */
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
    }

    $scope.showUser = function(){
        $http.get(basePath + '/users/user/' + userLogin)
            .success(function (data) {
                if ("M" === data[0].gender) {
                    data[0].gender = "Male"; 
                }else if ("F" === data[0].gender){
                    data[0].gender = "Female";
                }
                $scope.users = data[0];
                $scope.coucou = "coucou";
                console.log($scope.users);
            })
            .error(function (data, status) {
                console.log(data);
            });
	   }
    $scope.showUser();


		/* repeatClick pour la suppression d'un user */
	$scope.deleteUser = function(user, $repeatScope){

    	$http.delete( basePath + '/users/user/' + user.email)
    		.success(function(data){
            $window.alert("User deleted.");
          	})
          	.error(function(data){
            $window.alert('Unable to delete user ...');
	        });
	   }
});

