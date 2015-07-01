
var userLogin = "aoubid_h@etna-alternance.net";
var userId    = "558ab5aed2b78aaede7b7c77";
var role    = "superuser";

/* Controlleur pour les articles */

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
                $window.location.href = '#/articles';
                $scope.$apply();
            })
            .error(function(data){
                $window.alert('Unable to create article ...');
            });
        }
        else {
           $window.alert('Unable to create article... Missing argument'); 
        }
	}

	$scope.delArticle = function(article, $repeatScope){
		$http.delete(basePath + '/articles/article/' + article._id)
		.success(function(){
            window.alert('Article deleted ...');
            $window.location.href = '#/articles';
            $scope.$apply();
		})
		.error(function(){
            window.alert('Not deleted ...');
		});
	}
});