;(function (angular) {
    'use strict';

    angular.module('wPage').directive('ngShowdown', [
        '$sanitize',
        '$http',
        function ($sanitize, $http) {
            var showdown = new Showdown.converter();

            return {
                restrict: 'E',
                replace: 'true',
                template: '<div></div>',
                scope: {
                    file: '=',
                    link: '='
                },
                link: function (scope, element, attrs) {
                    scope.content = 'hello';

                    scope.$watch('file', function () {
                        if (!scope.file) { return; }

                        $http.get(scope.file).
                            success(function(data, status, headers, config) {
                                if (data) {
                                    var html = $sanitize(showdown.makeHtml(data));
                                    element.html(html);
                                    var headers = element.find('h1');
                                    if (scope.link && headers && headers.length > 0) {
                                        $(headers[0]).wrap('<a href="' + scope.link + '"></a>');
                                    }
                                }  else {
                                    element.html('');
                                }
                                //console.log(headers('last-modified'), config);
                            }).
                            error(function(data, status, headers, config) {
                                element.html('Error loading MD file.');
                            });
                    });
                }
            };
        }
    ]);

}(angular));

