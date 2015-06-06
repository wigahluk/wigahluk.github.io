(function (angular) {
    'use strict';

    angular.module('wPage').directive('post', [
        'postService',
        function (posts) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'src/views/directives/post.html',
                scope: {
                    file: '@', // Used for MD or HTML files
                    url: '@',
                    link: '@',
                    date: '@'
                },
                link: function (scope, element, attrs) {
                    scope.content = '';
                    scope.onLoad = onLoadFromDirective;
                    if (scope.date) {
                        processDate(new Date(scope.date));
                    }
                    scope.$watch('file', function () {
                        if (!scope.file) { return; }
                        fetch(scope.file);
                    });

                    function fetch (articleName) {
                        scope.isHtml = articleName.substr(articleName.length - 5) == '.html';
                        if(scope.isHtml) { fetchHtml(articleName); }
                        else { fetchMd(articleName); }
                    }

                    function fetchHtml (articleName) {
                        posts.file('posts/' + articleName).then(function (article) {
                            processDate(article.date());
                            var cont = element.find('.html-container');
                            cont.html(article.content());
                            var headers = cont.find('h1');
                            if (headers && headers.length > 0) {
                                $(headers[0]).wrap('<a href="' + "#/post/" + articleName + '"></a>');
                            }
                        }, function (error) {
                            console.log('error', error);
                        });
                    }

                    function fetchMd (articleName) {
                        posts.article(articleName).then(function (article) {
                            scope.content = article.content();
                            scope.link = "#/post/" + article.name();
                            processDate(article.date());
                        }, function (error) {
                            console.log('error', error);
                        });
                    }

                    function onLoadFromDirective (data, xhr) {
                        var date = xhr.getResponseHeader('Link')
                    }

                    function processDate(date) {
                        scope.day = date.getDate();
                        scope.month = date.getMonth();
                        scope.year = date.getYear() + 1900;
                    }
                }
            };
        }
    ]);
}(angular));

