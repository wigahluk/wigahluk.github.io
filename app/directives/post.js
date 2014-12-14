(function (angular) {
    'use strict';

    angular.module('wPage').directive('post', [
        '$location',
        function ($location) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'app/directives/post.html',
                scope: {
                    timestamp: '@',
                    file: '@'
                },
                link: function (scope, element, attrs) {
                    scope.fileUri = "posts/" + scope.file + ".md";
                }
            };
        }
    ]);
}(angular));

