app.directive('chatBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/chat-box.html',
        scope: {
            user: '='
        },
        controller: ['$scope', '$window', function ($scope, $window) {
            
            $scope.newMessage = '';

            $scope.addMessage = function () {

                if ($scope.newMessage === '') {
                    return
                }
                
                // When checks are over, add the message
                $scope.user.Messages.push($scope.newMessage);
                $window.localStorage.setItem('user_' + $scope.user.id, angular.toJson($scope.user));

                // Clear the input field
                $scope.newMessage = '';
                
            };
        }]
    };
});