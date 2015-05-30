(function (angular) {
    'use strict';

    angular.module('wPage').controller('controller/post', [
        '$scope',
        '$routeParams',
        function ($scope, $routeParams) {
            var file = $routeParams.post;
            $scope.post = file;
        }
    ]);
}(angular));