(function (angular) {
    'use strict';

    angular.module('wPage').controller('home/app', [
        '$scope',
        function ($scope) {
            $scope.name = 'My Name';
        }
    ]);
}(angular));