(function (angular) {
    'use strict';

    angular.module('wPage').controller('home/app', [
        '$scope',
        'postService',
        function ($scope, postService) {
            postService.index().then(function (data) {
                var articles = _.map(data, function (entry) {
                    return { name: entry.name, date: new Date(entry.date) };
                });
                $scope.articles = _.sortBy(articles, function (a) { return -a.date.valueOf(); });
            });
        }
    ]);
}(angular));