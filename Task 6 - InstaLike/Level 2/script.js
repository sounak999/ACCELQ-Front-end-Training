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


    // like functions
    this.doubleLike = function ($event) {
        
        let parent = $event.target.parentElement
        let button = parent.lastElementChild
        
        if (button.innerText === "Like") {

            button.innerText = "Liked!"
            $event.target.style.border = "5px solid #f8124b";
            $scope.totalLikes++

        } else {

            button.innerText = "Like"
            $event.target.style.border = "1px solid #ccc";
            $scope.totalLikes--

        }

    }

    this.singleLike = function ($event) {
        let button = $event.target
        let image = button.previousElementSibling

        if (button.innerText === "Like") {
            button.innerText = "Liked!"
            image.style.border = "5px solid #f8124b";
            $scope.totalLikes++
        } else {
            button.innerText = "Like"
            $scope.totalLikes--
            image.style.border = "1px solid #ccc";
        }
    }
}]);

// Directive
app.directive('imageElement', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '='
        },
        template: '<img ng-src="{{item.imageURL}}" alt="img-{{$index+1}}" ng-class="{liked: item.isLiked}" />'
    };
});