(function (angular) {
    'use strict';

    angular.module('wPage').controller('books/app', [
        '$scope',
        function ($scope) {

            var books = [{
                title: 'Microinteractions',
                notes: 'microinteractions',
                cover: 'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1491945923&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=wigahlukblog-20',
                amazonLink: 'http://www.amazon.com/gp/product/1491945923/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1491945923&linkCode=as2&tag=wigahlukblog-20&linkId=ONQ7SO2ES57THCQR',
                author: 'Dan Saffer',
                stars: 4
            }];


            $scope.books = _.sortBy(books, 'title');
        }
    ]);
}(angular));