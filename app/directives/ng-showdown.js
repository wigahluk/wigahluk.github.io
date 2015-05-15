;(function (angular) {
    'use strict';

    angular.module('wPage').directive('ngShowdown', [
        '$sanitize',
        '$http',
        function ($sanitize, $http) {
            var showdown = new Showdown.converter();

            return {
                restrict: 'E',
                template: '<div ng-transclude></div>',
                transclude: 'true',
                scope: {
                    content: '=',
                    href: '=',
                    source: '=',
                    onLoad: '='
                },
                link: function (scope, element, attrs) {

                    var innerNode = element.find('.ng-scope');
                    if (innerNode.length > 0) {
                        console.log(innerNode);
                        applyContent(innerNode.html());
                    }

                    scope.$watch('source', function () {
                        if (!scope.source) { return; }

                        $.ajax({
                            url: scope.source,
                            crossDomain: true
                        })
                            .done(function(data, textStatus, xhr) {
                                if(scope.onLoad) {
                                    scope.onLoad(data, xhr);
                                }
                                applyContent(data);
                            })
                            .fail(function() {
                                console.log('error reading external file');
                            });
                    });

                    scope.$watch('content', function () {
                        if(_.isUndefined(scope.content)) { return; }
                        applyContent(scope.content);
                    });

                    function applyContent (content) {
                        if (!content) {
                            element.html('');
                            return;
                        }
                        var html = $sanitize(showdown.makeHtml(content));
                        element.html(html);
                        var headers = element.find('h1');
                        if (scope.href && headers && headers.length > 0) {
                            $(headers[0]).wrap('<a href="' + scope.href + '"></a>');
                        }
                    }
                }
            };
        }
    ]);

}(angular));

