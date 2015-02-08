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
                    scope.link = scope.book.amazonLink || scope.book.gitHubLink || scope.book.link;
                    scope.hasCover = (scope.book.cover && scope.book.cover.length > 1);
                    scope.hasAmazon = (scope.book.amazonLink && scope.book.amazonLink.length > 1);
                    scope.hasGitHub = (scope.book.gitHubLink && scope.book.gitHubLink.length > 1);
                    scope.onlyLink = (scope.book.link && scope.book.link.length > 1 && !scope.hasAmazon && !scope.hasGitHub);
                }
            };
        }
    ]);
}(angular));
