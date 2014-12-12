(function (angular) {
    'use strict';

    angular.module('wPage').controller('about/app', [
        '$scope',
        function ($scope) {
            $scope.name = 'My Name';
        }
    ]);
}(angular));