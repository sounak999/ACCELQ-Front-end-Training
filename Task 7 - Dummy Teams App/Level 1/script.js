var app = angular.module('userApp', [])

app.controller('UserController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    $http.get('data.json')
        .then(function (response) {
            $scope.users = response.data;
            $scope.totalUsers = $scope.users.length
            console.log('Users data loaded successfully :)');
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });

    /*
    $scope.preLoad = function(user) {
        // User Activity
        user.away = false;
        user.offline = false;

        // Set status to Away after 10 seconds
        const awayTimeout = $timeout(function () {
            user.away = true;
            console.log("Away status " + user.Name);
        }, 10000);

        // Set status to Offline after 20 seconds
        const offlineTimeout = $timeout(function () {
            user.offline = true;
            console.log("Offline status " + user.Name);
        }, 20000);
    }

    // Function to reset the timer
    $scope.resetTimer = function (user) {
        $timeout.cancel(awayTimeout);
        $timeout.cancel(offlineTimeout);
        user.away = false;
        user.offline = false;

        // Start new timeouts
        const awayTimeout = $timeout(function () {
            user.away = true;
        }, 10000);

        const offlineTimeout = $timeout(function () {
            user.offline = true;
        }, 20000);
    };
    */

    // Add message function
    $scope.newMessage = ''

    $scope.addMessage = function (user, newMessage) {
        // character validation
        if (newMessage.length === 0) {
            user.showError = true;
            user.errorMessage = "You can't send empty message";
            return;
        }

        if (newMessage.length > 50) {
            user.showError = true;
            user.errorMessage = "You can't send more than 50 characters";
            return;
        }

        // check total messages
        if (user.Messages.length === 5) {
            user.showError = true;
            user.errorMessage = "Only 5 messages per user is a limit";
            return;
        }

        // check for duplicate message
        if (user.Messages.indexOf(newMessage) !== -1) {
            user.showError = true;
            user.errorMessage = "You can't send duplicate message";
            return;
        }


        // when checks are over, add your message
        user.Messages.push(newMessage);

        // reset the errors
        user.showError = false;
        user.errorMessage = '';
    }
}]);

/*
app.directive('userActivity', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            user: '='
        },
        template: 
        `<div class="user-header">
            <span class="user-name">{{ user.Name }}</span>
            <img class="status-icon" src="images/active.png" alt="Online">
            <img class="status-icon" src="images/away.png" alt="Away">
            <img class="status-icon" src="images/offline.png" alt="Offline">
        </div>`
    };
})

app.directive('userMessage', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            user: '='
        },
        template: 
        `<span>
            <div class="user-main">
                <div class="messages" ng-repeat="message in user.Messages">{{ message }}</div>
            </div>
            <div class="user-footer">
                <input class="user-input" type="text" placeholder="Type your message..." ng-model="newMessage">
                <div class="error-message" ng-show="showError">{{ errorMessage }}</div>
                <button class="user-button" ng-click="addMessage(user, newMessage)">Send</button>
            </div>
        </span>`
    };
});
*/
