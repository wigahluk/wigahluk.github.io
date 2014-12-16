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
                    var dateParts = scope.timestamp.split('/');
                    scope.day = dateParts[1];
                    scope.month = dateParts[0];
                    scope.year = dateParts[2];
                    scope.fileUri = "posts/" + scope.file + ".md";
                }
            };
        }
    ]);
}(angular));

