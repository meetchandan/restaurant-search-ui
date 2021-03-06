var app = angular.module('app', [])

app.controller('autoCompleteController', function($scope, $http) {
    $scope.suggestions = [];
    $scope.selectedIndex = -1;
    $scope.search = function() {
        if($scope.searchText!=""){
        	$http.get("http://localhost:8080/search/" + $scope.searchText)
            .success(function(data) {
            	$scope.errorMessage = ""
                $scope.suggestions = data;
            })
            .error(function(data) {
                $scope.errorMessage = "Couldn't connect to Server, Please check if the server is up.";
            });
        }
    }

    $scope.$watch('selectedIndex', function(val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex].name + " in " + $scope.suggestions[$scope.selectedIndex].city;
        }
    });

    $scope.checkKeyDown = function(event) {
            if ($scope.suggestions.length !== 0) {
                if (event.keyCode === 40) { //down key, increment selectedIndex
                    event.preventDefault();
                    if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
                        $scope.selectedIndex++;
                    }
                } else if (event.keyCode === 38) { //up key, decrement selectedIndex
                    event.preventDefault();
                    if ($scope.selectedIndex - 1 !== -1) {
                        $scope.selectedIndex--;
                    }
                } else if (event.keyCode === 13) { //enter key, empty suggestions array
                    event.preventDefault();
                    $scope.searchText = $scope.suggestions[$scope.selectedIndex].name + " in " + $scope.suggestions[$scope.selectedIndex].city;
                    $scope.show = $scope.suggestions[$scope.selectedIndex];
                    $scope.suggestions = [];
                }
            }
        }

    $scope.AssignValueAndHide = function(index) {
        $scope.searchText = $scope.suggestions[index].name + " in " + $scope.suggestions[index].city;
        $scope.show = $scope.suggestions[index];
        $scope.suggestions = [];
    }
});