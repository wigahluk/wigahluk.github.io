(function (angular) {
    'use strict';

    angular.module('wPage').controller('about/app', [
        '$scope',
        'postService',
        function ($scope, posts) {
            $scope.source='README.md';
        }
    ]);
}(angular));