var app = angular.module('userApp', []);

app.controller('UserController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    // Load JSON data
    if (localStorage.length > 0) {

        // initialize empty users
        $scope.users = [];

        // Iterate through each key
        for (let id = 1; id <= localStorage.length; id++) {
            let key = 'user_' + id;
            let user = angular.fromJson($window.localStorage.getItem(key));
            $scope.users.push(user);
        }

        // total users count
        $scope.totalUsers = $scope.users.length;

        console.log('All users retrieved from local storage');

    } else {

        // load JSON data
        $http.get('data.json')
            .then(function (response) {
                $scope.users = response.data;
                $scope.totalUsers = $scope.users.length;
                console.log('Users data loaded successfully :)');

                // Save data to local storage
                angular.forEach($scope.users, function (user) {
                    $window.localStorage.setItem('user_' + user.id, angular.toJson(user));
                })

                // console.log(localStorage.length);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }

}]);
