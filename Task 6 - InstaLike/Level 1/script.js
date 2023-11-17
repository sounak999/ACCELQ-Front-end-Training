var app = angular.module('instaLike', []);

// Controllers
// image --> separate directive --> url: show the url (eventListener)
app.controller('likeController', ['$scope', '$http', function ($scope, $http) {
    
    $http
        .get('data.json')
        .then(function (response) {
            $scope.items = response.data;
            $scope.totalLikes = $scope.items.filter(item => item.isLiked).length;
            $scope.toggleLike = function (item) {

                item.isLiked = !item.isLiked;
                if (item.isLiked) {
                    $scope.totalLikes++;
                } else {
                    $scope.totalLikes--;
                }
            };
        });

}])