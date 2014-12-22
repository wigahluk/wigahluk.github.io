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
                    book: '='
                },
                link: function (scope, element, attrs) {
                    scope.fileUri = "book-listings/" + scope.book.notes + ".md";
                }
            };
        }
    ]);
}(angular));
