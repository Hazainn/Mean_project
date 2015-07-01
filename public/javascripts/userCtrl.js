var userLogin = "aoubid_h@etna-alternance.net";
var userId    = "558ab5aed2b78aaede7b7c77";
var role      = "superuser";
var admin     = false;
        /* controlleur pour les users */

myBlog.controller('users', function($scope, $http, $window) {

    $scope.admin = admin;
        
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


myBlog.controller('putUser', function($scope, $http, $window) {
    
    $http.get(basePath + '/users/user/' + userLogin)
        .success(function (data) {
            if ("M" === data[0].gender) {
                data[0].gender = "Male"; 
            }else if ("F" === data[0].gender){
                data[0].gender = "Female";
            }
            $scope.user= data[0];
        })
        .error(function (data, status) {
            console.log(data);
        });
    $window.location.href = '#/users/user/' + userLogin;

    $scope.putUserPassword = function(){
        if ($scope.oldpwd === $scope.user.password){
            $window.location.href = '#/users/user/' + userLogin;
            
            $scope.user.password = $scope.newpwd;
            $http.put( basePath + '/users/user/' + userLogin,
               {
                 "Firstname":$scope.user.firstname,
                 "Lastname" :$scope.user.lastname,
                 "email"    :$scope.user.email,
                 "password" :$scope.user.password,
                 "gender"   :$scope.user.gender,
                 "role"     : {
                    "role1": role
                 }
                })
            .success(function(data){
                $window.alert("Password changed");
                $window.location.href = '#/users/user/' + userLogin;
                })
                .error(function(data){
                $window.alert('Unable to create user ...');
                $window.location.href = '#/users/user/' + userLogin;
               });
        }else {
            $window.alert("Wrong old password");
        }
    }
});
