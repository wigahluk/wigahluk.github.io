(function (angular) {
    'use strict';

    angular.module('wPage').directive('bookListing', [
        'postService',
        function (posts) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'app/directives/views/book-listing.html',
                scope: {
                    book: '='
                },
                link: function (scope, element, attrs) {
                    var fileUri = "book-listings/" + scope.book.notes + ".md";
                    posts.file(fileUri).then(function (bookNotes) {
                        scope.content = bookNotes.content();
                    }, function (error) {
                        console.log('error', error);
                    });
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
