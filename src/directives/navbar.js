(function (angular) {
    'use strict';

    angular.module('wPage').directive('navbar', [
        '$location',
        function ($location) {
            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'src/views/directives/navbar.html',
                scope: {
                    navtabs: '='
                },
                link: function (scope, element, attrs) {
                    var tabs = scope.navtabs;
                    scope.homeTab = tabs[0];
                    scope.tabs = _.filter(tabs, function (tab) {
                        return tab.url !== '/';
                    });

                    var selectedTab = _.find(tabs, function (tab) {
                        return tab.url === $location.path();
                    });
                    if (selectedTab) {
                        selectedTab.active = true;
                    }
                    scope.selectTab = function (tab) {
                        if (selectedTab) {
                            selectedTab.active = false;
                        }
                        selectedTab = tab;
                        selectedTab.active = true;
                        $location.url(selectedTab.url);
                    };
                }
            };
        }
    ]);
}(angular));
