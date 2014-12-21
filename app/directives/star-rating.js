(function (angular) {
    'use strict';

    angular.module('wPage').directive('starRating', [
        '$location',
        function ($location) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'app/directives/star-rating.html',
                scope: {
                    rating: "@"
                },
                link: function (scope, element, attrs) {
                }
            };
        }
    ]);
}(angular));
