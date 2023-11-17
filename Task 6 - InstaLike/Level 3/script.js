var app = angular.module('instaLike', []);

// Controller
app.controller('mainController', ['$scope', '$http', function ($scope, $http) {

    // displaying data
    $http
        .get('data.json')
        .then(function (response) {
            $scope.items = response.data;
            $scope.totalLikes = $scope.items.filter(item => item.isLiked).length;
        });

    $scope.toggleLike = function ( item) {
        item.isLiked = !item.isLiked
        // $scope.items[$index].isLiked = !$scope.items[$index].isLiked;

        // if ($scope.items[$index].isLiked === true) {
        if(item.isLiked) {
            $scope.totalLikes++;
        } else {
            $scope.totalLikes--;
        }
    }

}]);

// Directive
app.directive('imageElement', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '=',
            toggleLike: '&'
        },
        template: '<img ng-src="{{item.imageURL}}" alt="img-{{$index+1}}" ng-dblclick="toggleLike(item)" ng-class="{liked: item.isLiked}" />'
    };
});