(function (angular) {
    'use strict';

    angular.module('wPage').factory('postService', [
        '$http',
        '$q',
        function ($http, $q) {

            // Post
            function Article (articleInfo, data, date) {
                this.file = function () { return articleInfo.file(); };
                this.type = function () { return articleInfo.type(); };
                this.name = function () { return articleInfo.name(); };
                this.date = function () { return date; };
                this.content = function () { return data; };
            }
            // ArticleInfo
            function ArticleInfo (articleName) {
                this.file = function () {
                    return "posts/" + articleName;
                };
                this.type = function () {
                    if (_.endsWith(articleName, 'html')) {
                        return 'html';
                    }
                    return 'md';
                };
                this.name = function () {
                    return articleName;
                };
            }


            var service = {
                index: function () {
                    var q = $q.defer();
                    $http.get('dist/pindex.json').
                        success(function (data, status, headers, config) {
                            var index = data;
                            q.resolve(data);
                        }).
                        error(function (data, status, headers, config) {
                            q.reject(data);
                        });
                    return q.promise;
                },
                article: function (articleName) {
                    var q = $q.defer();
                    var info = new ArticleInfo(articleName);
                    $http.get(info.file()).
                        success(function (data, status, headers, config) {
                            var date = headers('last-modified');
                            date = new Date(date);
                            var article = new Article(info, data, date);
                            q.resolve(article);
                        }).
                        error(function (data, status, headers, config) {
                            q.reject(data);
                        });
                    return q.promise;
                },
                file: function (filePath) {
                    var q = $q.defer();
                    $http.get(filePath).
                        success(function (data, status, headers, config) {
                            var date = headers('last-modified');
                            date = new Date(date);
                            var result = {
                                content: function () { return data; },
                                date: function () { return date; }
                            };
                            q.resolve(result);
                        }).
                        error(function (data, status, headers, config) {
                            q.reject(data);
                        });
                    return q.promise;
                }
            };

            return service;
        }
    ]);
}(angular));