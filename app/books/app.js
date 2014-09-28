(function (angular) {
    'use strict';

    angular.module('wPage').controller('books/app', [
        '$scope',
        function ($scope) {
            $scope.name = 'My Name';
        }
    ]);
}(angular));