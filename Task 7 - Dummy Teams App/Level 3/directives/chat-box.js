app.directive('chatBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/chat-box.html',
        scope: {
            user: '=',
            noOfUsers: '='
        },
        controller: ['$scope', '$window', '$timeout', function ($scope, $window, $timeout) {
            
            let activeToAway, awayToOffline;

            $scope.newMessage = '';
            $scope.showStatus = 'active';

            function updateStatus() {
                activeToAway = $timeout(function () {
                    $scope.showStatus = 'away';
                    $scope.noOfUsers.away++;
                    $scope.noOfUsers.active--;

                    awayToOffline = $timeout(function () {
                        $scope.showStatus = 'offline';
                        $scope.noOfUsers.offline++;
                        $scope.noOfUsers.away--;
                    }, 5000);

                }, 5000)
            }

            // Function to reset status to active on user interaction
            $scope.resetStatus = function() {
                if ($scope.showStatus === 'away') {
                    $timeout.cancel(awayToOffline);
                    $scope.noOfUsers.away--;
                } else {
                    $timeout.cancel(activeToAway);
                    $scope.noOfUsers.offline--;
                }

                $scope.showStatus = 'active';
                $scope.noOfUsers.active++;
                updateStatus();
            }

            // Initialize status update
            updateStatus();

            $scope.addMessage = function () {

                if ($scope.newMessage === '') {
                    return ;
                }
                
                // When checks are over, add the message
                $scope.user.Messages.push($scope.newMessage);
                $window.localStorage.setItem('user_' + $scope.user.id, angular.toJson($scope.user));

                // Clear the input field
                $scope.newMessage = '';
                $scope.user.showStatus = 'active';
                
            };

        }]
    };
});