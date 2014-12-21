(function (angular) {
    'use strict';

    angular.module('wPage').directive('bookListing', [
        '$location',
        function ($location) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'app/directives/book-listing.html',
                scope: {
                    book: '=',
                    subtitle: '@',
                    cover: '@',
                    amazonLink: '@',
                    author: '@',
                    year: '@',
                    started: '@',
                    finished: '@',
                    stars: '@',
                    labels: '@',
                    website: '@',
                    notes: '@'
                },
                link: function (scope, element, attrs) {
                    scope.fileUri = "book-listings/" + scope.book.notes + ".md";
                }
            };
        }
    ]);
}(angular));
